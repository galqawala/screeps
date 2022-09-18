//ToDo: Build in other rooms

var minTransfer = 8;

//  To disable "File is a CommonJS module; it may be converted to an ES module. ts(80001)"
//  disable setting: JavaScript › Validate: Enable > Enable/disable JavaScript validation.
module.exports.loop = function () {
    for(const i in Game.creeps) handleCreep(Game.creeps[i]);
    for(const i in Game.spawns) handleSpawn(Game.spawns[i]);
    for(const i in Game.rooms)  handleRoom (Game.rooms [i]);
    if (Game.time%50 == 0) msg(null,'source fill ratio: '+globalSourceFillRatio());
};

function bodyByRatio(ratios, maxCost) {
    var partAmounts = {};
    var cost = 0;

    for(const part in ratios) {
        partAmounts[part] = 1;
        var partCost = BODYPART_COST[part];
        if (!partCost) {
            msg('bodyByRatio()',"Can't find cost for part: "+part);
            return null;
        }
        cost += BODYPART_COST[part];
        if (isNaN(cost)) return null;
    }

    for (;;) { //until break
        var nextPart = bodyPartToAddByRatio(ratios, partAmounts);

        if (cost+BODYPART_COST[nextPart] > maxCost) break;

        partAmounts[nextPart]++;
        cost += BODYPART_COST[nextPart];
    } 

    var body = [];
    for(const part in partAmounts) {
        for (var x = 1; x <= partAmounts[part]; x++) {
            body.push(part);
        }
    }

    return body;
}

function bodyPartToAddByRatio(ratios, partAmounts) {
    var nextPart = null;
    var minRatio = Number.POSITIVE_INFINITY;

    for(const part in ratios) {
        var ratio = partAmounts[part] / ratios[part];
        if (minRatio > ratio) {
            minRatio = ratio;
            nextPart = part;
        }
    }

    return nextPart;
}

function handleRoom(room) {
    //control towers
    var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for(const i in towers) handleTower(towers[i]);

    handleHostilesInRoom(room);

    //construct structures
    const structureTypes = [STRUCTURE_TOWER, STRUCTURE_EXTENSION, STRUCTURE_LINK, STRUCTURE_STORAGE, STRUCTURE_CONTAINER];
    structureTypes.forEach(structureType => construct(room,structureType));
    
    //handle links
    handleLinks(room);
    
    if (!(room.memory.upgraderSpots )) updateUpgraderSpots (room);
    if (!(room.memory.harvesterSpots)) updateHarvesterSpots(room);

    var constructionSiteCount = room.find(FIND_MY_CONSTRUCTION_SITES).length;
    if (room.memory.constructionSiteCount != constructionSiteCount) {
        msg(room, 'Construction sites: '+constructionSiteCount, true);
        room.memory.constructionSiteCount = constructionSiteCount;
    }
}

function handleHostilesInRoom(room) {
    //check for presence of hostiles
    var hostiles = room.find(FIND_HOSTILE_CREEPS).concat(room.find(FIND_HOSTILE_POWER_CREEPS));
    var hostilesPresent = hostiles.length > 0;
    
    if (room.memory.hostilesPresent != hostilesPresent) {
        if (hostilesPresent) {
            var hostileOwners = hostiles.map(creep => creep.owner.username).filter(onlyUnique);
            msg(room, hostiles.length+' hostiles from '+hostileOwners+' detected!', true);
        } else {
            msg(room, 'clear from hostiles =)', true);
        }
        room.memory.hostilesPresent = hostilesPresent;
    }
    
    //enable safe mode if necessary
    if (hostilesPresent) {
        var towerCount = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).length;
        if (towerCount <= 0) {
            if (room.controller && room.controller.activateSafeMode() == OK) {
                msg(room.controller, 'safe mode activated!', true);
            }
        }
    }
}

function updateUpgraderSpots(room) {
    if (!(room.controller)) return;
    msg(room,'Updating upgrader spots');
    var targetPos = room.controller.pos;
    var range = 3;
    const terrain = new Room.Terrain(room.name);
    var spots = [];

    for (var x = targetPos.x-range; x <= targetPos.x+range; x++) {
        for (var y = targetPos.y-range; y <= targetPos.y+range; y++) {
            if (x == targetPos.x && y == targetPos.y) continue;
            if (terrain.get(x,y) == TERRAIN_MASK_WALL) continue;
            var pos = new RoomPosition(x,y,room.name);
            if (spots.includes(pos)) msg(room,pos+' already listed');
            spots.push(pos);
        }
    }
    room.memory.upgraderSpots = spots;
}

function updateHarvesterSpots(room) {
    msg(room,'Updating harvester spots');
    var range = 1;
    const terrain = new Room.Terrain(room.name);
    var spots = [];

    room.find(FIND_SOURCES).forEach(source => {
        var targetPos = source.pos;
    
        for (var x = targetPos.x-range; x <= targetPos.x+range; x++) {
            for (var y = targetPos.y-range; y <= targetPos.y+range; y++) {
                if (x == targetPos.x && y == targetPos.y) continue;
                if (terrain.get(x,y) == TERRAIN_MASK_WALL) continue;
                var pos = new RoomPosition(x,y,room.name);
                if (!containsPosition(spots, pos)) spots.push(pos);
            }
        }
        room.memory.harvesterSpots = spots;
    });
}

function containsPosition(list, pos) {
    return list.filter(listPos => listPos.x == pos.x && listPos.y == pos.y).length > 0;
}

function handleLinks(room) {
    //move energy towards upgraderLastTask
    var upgraderLastTask = Game.getObjectById(room.memory.upgraderLastTask);
    if (!upgraderLastTask) return;
    var links = room.find(FIND_MY_STRUCTURES, {filter: (link) => { return link.structureType == STRUCTURE_LINK; }})
        .sort(function(x, y) { //sort: furthest/upstream -> closest/downstream
            return y.pos.getRangeTo(upgraderLastTask) - x.pos.getRangeTo(upgraderLastTask);
        });
    var upstreamIndex = 0;
    var downstreamIndex = links.length-1;
    while (upstreamIndex < downstreamIndex) {
        var upstreamLink   = links[upstreamIndex];
        var downstreamLink = links[downstreamIndex];
        if (isEmpty(upstreamLink) || upstreamLink.cooldown) {
            upstreamIndex++;
        } else if (fillRatio(downstreamLink) >= 0.9) {
            downstreamIndex--;
        } else {
            upstreamLink.transferEnergy(downstreamLink);
            upstreamIndex++;
        }
    }
}

function handleTower(tower) {
    var targetFilter = {filter: (target) => { return target.my==false || target.hits < (target.hitsMax / 2); }};
    var targets = []
        .concat( tower.room.find(FIND_CREEPS, targetFilter) )
        .concat( tower.room.find(FIND_STRUCTURES, targetFilter) )
        .concat( tower.room.find(FIND_POWER_CREEPS, targetFilter) )
        .sort(function(x, y) { return targetScore(tower, y) - targetScore(tower, x); })
    ;
    if (targets.length < 1) return;
    var target = targets[0];

    if (target.my == false) {
        tower.attack(target);
    } else if (target instanceof Creep || target instanceof PowerCreep) {
        tower.heal(target);
    } else {
        tower.repair(target);
    }
}

function targetScore(tower, target) {
    var score = -(tower.pos.getRangeTo(target));
    if (target.my == false) score += 10;
    if (target.my == true ) score -= 10;
    if (target instanceof Creep) score += target.getActiveBodyparts(HEAL);
    return score;
}

function getDestinationFromMemory(creep) {
    var destination = creep.memory.destination;
    
    if ( (!(creep.memory.empty) && isEmpty(creep)) || (!(creep.memory.full) && isFull(creep)) ) {
        //got full/empty -> replan destination
        destination = resetDestination(creep);
    }

    if (destination) {
        if (typeof destination === 'string') {
            destination = Game.getObjectById(creep.memory.destination);
        } else if ('x' in destination && 'y' in destination && 'roomName' in destination) {
            destination = new RoomPosition(destination.x, destination.y, destination.roomName);
        }
        
        if (destination instanceof RoomPosition && creep.room.name != destination.roomName
            && (destination.x == 0 || destination.x == 49 || destination.y == 0 || destination.y == 49)
        ) {
            //successfully arrived to another room
            creep.say('🌐');
            destination = resetDestination(creep);
        }
        
        if (creep.memory.repair && !needsRepair(destination)) destination = resetDestination(creep);

        if (destination && creep.pos.roomName != creep.memory.roomName && creep.pos.roomName == destination.pos.roomName) {
            //we've just arrived to the destination room, let's reconsider the destination, now that we can calculate the distances within the room
            destination = resetDestination(creep);
        }
    }

    return destination;
}

function handleCreep(creep) {
    if (creep.spawning) return;
    
    var role = creep.memory.role;
    var destination = getDestinationFromMemory(creep);

    if (creep.memory.awaitingDeliveryFrom && !(Game.creeps[creep.memory.awaitingDeliveryFrom])) {
        creep.memory.awaitingDeliveryFrom = null; //no longer await delivery from a dead creep
    } else if (role == 'carrier' && destination instanceof Creep && isEmpty(creep)) {
        destination = resetDestination(creep); //cancel delivery, when empty
    }
    
    var link = nearbyLinkForTransfer(creep.pos);
    if (role == 'harvester' && isFull(creep) && !isEmpty(creep) && destination instanceof Source && link) {
        destination = link;
    }

    //create a new plan if situation requires
    if (!destination) {
        destination = getNewDestination(creep);
        setDestination(creep, destination);
    }
    
    var actionOutcome = action(creep, destination);

    //time we got to the destination proximity
    if (destination && !(creep.memory.timeArrivedToDestinationProximity) && creep.pos.getRangeTo(destination) <= 3) {
        creep.memory.timeArrivedToDestinationProximity = Game.time;
    }
    postAction(creep, destination, actionOutcome);

    if (role == 'upgrader' && !useLink(creep)) orderEnergy(creep, destination);
    memorizeCreepState(creep);
}

function memorizeCreepState(creep) {
    if (((creep.memory.x||-1) != creep.pos.x) || ((creep.memory.y||-1) != creep.pos.y)) {
        creep.memory.x = creep.pos.x;
        creep.memory.y = creep.pos.y;
        creep.memory.roomName = creep.pos.roomName;
        creep.memory.lastMoveTime = Game.time;
    }
    creep.memory.empty = isEmpty(creep);
    creep.memory.full  = isFull (creep);
    updateConstructionSiteScoreForCreep(creep);
}

function setDestination(creep, destination) {
    if (destination && (creep.memory.destination || creep) != (destination.id || destination)) {
        creep.memory.destination = (destination.id || destination);
        creep.memory.destinationSetTime = Game.time;
    }
}

function getNewDestination(creep) {
    var role = creep.memory.role;
    var myMinTransfer = minTransferAmount(creep);

    if (role == 'harvester') {
        var link = nearbyLinkForTransfer(creep.pos);
        if (isFull(creep) && !isEmpty(creep) && link) {
            return link;
        } else {
            var workPlaces = creep.room.find(FIND_SOURCES, {filter: (source) => { return source.energy > 0 && !isBlocked(creep,source); }});
            var destination;
            if (canHarvestInRoom(creep.room) && workPlaces.length) {
                destination = creep.pos.findClosestByPath(workPlaces);
            }
            if (!destination) destination = getExit(creep.pos);
            return destination;
        }
    } else if (role == 'upgrader') {
        return getDestinationForUpgrader(creep);
    } else if (role == 'carrier') {
        var upstream = isFull(creep) ? [] : getEnergySources(myMinTransfer) ; //energy sources
        var downstream = isEmpty(creep) ? [] : getEnergyDestinations() ; //energy destinations
        destination = closest(creep.pos, upstream.concat(downstream));
        if (destination && destination.memory) destination.memory.awaitingDeliveryFrom = creep.name;
        return destination;
    } else if (role == 'spawner') {
        var spawnerUpstream = isFull(creep) ? [] : getEnergySources(myMinTransfer).concat( storagesWithPlentyEnergy() ) ; //energy sources
        var spawnerDownstream = isEmpty(creep) ? [] : getGlobalEnergyStructures() ; //energy destinations
        destination = closest(creep.pos, spawnerUpstream.concat(spawnerDownstream));
        if (destination && destination.memory) destination.memory.awaitingDeliveryFrom = creep.name;
        return destination;
    }
}

function action(creep, destination) {
    var actionOutcome;
    if (creep.memory.repair) {
        actionOutcome = creep.repair(destination);
    } else if (destination instanceof Source) {
        actionOutcome = creep.harvest(destination);
    } else if (destination instanceof StructureController) {
        actionOutcome = creep.upgradeController(destination);
    } else if (destination instanceof ConstructionSite) {
        actionOutcome = creep.build(destination);
    } else if (destination instanceof Resource) {
        actionOutcome = creep.pickup(destination);
    } else if ( destination instanceof Tombstone 
            ||  destination instanceof Ruin
            ||  destination instanceof StructureContainer
    ) {
        actionOutcome = creep.withdraw(destination, RESOURCE_ENERGY);
    } else if (destination instanceof RoomPosition) {
        var pathColor = hashColor(creep.memory.role);
        actionOutcome = creep.moveTo(destination, {visualizePathStyle: {stroke: pathColor}});
    } else if (destination instanceof StructureLink || destination instanceof StructureStorage) {
        if (creep.memory.role == 'upgrader' || creep.memory.role == 'spawner' || isDownstreamLink(destination)) {
            actionOutcome = creep.withdraw(destination, RESOURCE_ENERGY);
        } else {
            actionOutcome = creep.transfer(destination, RESOURCE_ENERGY);
        }
    } else if ( destination instanceof StructureSpawn
            ||  destination instanceof StructureExtension 
            ||  destination instanceof Creep 
            ||  destination instanceof StructureTower
    ) {
        actionOutcome = transfer(creep, destination);
    } else if (destination) {
        msg(creep, "don't know what to do with destination: "+destination, true);
    }

    creep.memory.lastActionOutcome = actionOutcome;
    return actionOutcome;
}

function transfer(creep, destination) {
    var actionOutcome = creep.transfer(destination, RESOURCE_ENERGY);
    if (actionOutcome == OK && destination) {
        if (destination.memory) {
            destination.memory.timeOfLastEnergyReceived = Game.time;
            resetDestination(creep);
        }
        if (destination instanceof StructureSpawn || destination instanceof StructureExtension) {
            creep.room.memory.timeOfLastSpawnEnergyDelivery = Game.time;
        } else if (destination instanceof Creep) {
            //the receiver should reconsider what to do after getting the energy
            resetDestination(destination);
        }
    }
    return actionOutcome;
}

function postAction(creep, destination, actionOutcome) {
    if (actionOutcome == OK) {
        creep.memory.lastOkActionTime = Game.time;
    } else {
        if (actionOutcome == ERR_NOT_IN_RANGE) {
            handleNotInRange(creep, destination);
        } else if (actionOutcome == ERR_FULL) {
            resetDestination(creep);
            handleCreep(creep);
            return;
        } else if (actionOutcome == ERR_NOT_ENOUGH_RESOURCES) {
            resetDestination(creep);
            handleCreep(creep);
            return;
        } else if (actionOutcome == ERR_NO_PATH) {
            creep.say('🚧');
            resetDestination(creep);
        } else if (actionOutcome == ERR_INVALID_TARGET) {
            creep.say('🔎');
            resetDestination(creep);
            memorizeBlockedObject(creep,destination);
        } else if (actionOutcome == ERR_TIRED) {
            creep.say('😓');
            if (creep.memory.role=='harvester' && !isEmpty(creep)) creep.drop(RESOURCE_ENERGY);
        } else if (actionOutcome == ERR_NOT_OWNER) {
            creep.say('👮');
            resetDestination(creep);
            creep.memory.destination = getExit(creep.pos);
            creep.memory.destinationSetTime = Game.time;
        }
    }
}

function handleNotInRange(creep, destination) {
    if (    destination
        &&  (creep.memory.timeArrivedToDestinationProximity) > (creep.memory.lastOkActionTime||0)
        &&  (creep.memory.timeArrivedToDestinationProximity) < (Game.time - 20)
    ) {
        creep.say('⌛️');
        resetDestination(creep);
        memorizeBlockedObject(creep,destination);
    } else {
        var pathColor = hashColor(creep.memory.role);
        creep.moveTo(destination, {visualizePathStyle: {stroke: pathColor}});
    }
}

function needsRepair(structure) {
    if (!structure) return false;
    if (structure.my == false) return false;
    if (!(structure.hits)) return false;
    if (!(structure.hitsMax)) return false;
    if (structure.hits >= structure.hitsMax) return false;
    return true;
}

function worthRepair(pos, structure) {
    if (!needsRepair(structure)) return false;
    var maxHpRatio = 1 - (pos.getRangeTo(structure)-5)/100;
    if ((maxHpRatio||0) < 0.5) maxHpRatio = 0.5;
    if (structure.hits/structure.hitsMax > maxHpRatio) return false;
    return true;
}

function getEnergySources(myMinTransfer, allowStorage = false, allowAnyLink = false) {
    var sources = [];

    for(const i in Game.rooms) {
        var room = Game.rooms[i];
        sources = sources
            .concat( room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => { return resource.energy >= myMinTransfer; }}) )
            .concat( room.find(FIND_TOMBSTONES, {filter: (tomb) => { return tomb.store.getUsedCapacity(RESOURCE_ENERGY) >= myMinTransfer; }}) )
            .concat( room.find(FIND_RUINS, {filter: (ruin) => { return ruin.store.getUsedCapacity(RESOURCE_ENERGY) >= myMinTransfer; }}) )
            .concat( room.find(FIND_STRUCTURES, {filter: (structure) => { 
                return ( structure.structureType == STRUCTURE_CONTAINER
                    ||  (structure.structureType == STRUCTURE_STORAGE && allowStorage)
                    ||  (structure.structureType == STRUCTURE_LINK && allowAnyLink)
                    ||  isDownstreamLink(structure)
                ) && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= myMinTransfer;
            }}) )
        ;
    }

    return sources;
}

function getEnergyDestinations() {
    var targets = [];

    for(const i in Game.rooms) {
        var room = Game.rooms[i];
        var roomTargets = room.find(FIND_MY_STRUCTURES, {filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && !isFull(structure);
        }});
        if (roomTargets.length < 1) {
            roomTargets = room.find(FIND_MY_STRUCTURES, {filter: (structure) => {
                return  !isFull(structure)
                    &&  (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE)
                    &&  !isDownstreamLink(structure)
                ;
            }});
        }
        if (roomTargets.length < 1) {
            roomTargets = getEnergyStructures(room);
        }
        targets = targets.concat(roomTargets);
    }

    return targets;
}

function storagesWithPlentyEnergy() {
    var storages = [];

    for(const i in Game.rooms) {
        var room = Game.rooms[i];
        storages = storages.concat( room.find(FIND_STRUCTURES, {filter: (structure) => { 
            return structure.structureType == STRUCTURE_STORAGE && getEnergy(structure) >= 150000;
        }}) );
    }
    
    return storages;
}

function storedEnergy() {
    var energy = 0;

    for(const i in Game.rooms) {
        var room = Game.rooms[i];
        energy += room.find(FIND_STRUCTURES, {filter: (structure) => { return structure.structureType == STRUCTURE_STORAGE; }})
            .reduce((aggregated, item) => aggregated + getEnergy(item), 0 /*initial*/);
    }
    
    return energy;
}

function isDownstreamLink(link) {
    if (link instanceof StructureLink) {
        return hasStructureInRange(link.pos, STRUCTURE_CONTROLLER, 6, false);
    }
    return false;
}

function closest(pos, options) {
    if (options.length < 1) return null;
    var destination = pos.findClosestByPath(options); //same room
    if (destination) return destination;
    destination = randomItem(options); //another room
    return destination;
}

function getDestinationForUpgrader(creep) {
    var destination;
    //fetch nearby energy
    if (isEmpty(creep) && !(creep.memory.awaitingDeliveryFrom)) {
        var energySources = getEnergySources(minTransferAmount(creep), true, true);
        destination = closest(creep.pos, energySources);
        return destination;
    }
    if (!isEmpty(creep)) {
        //upgrade the room controller if it's about to downgrade
        if (creep.room.controller && creep.room.controller.ticksToDowngrade < 2000) {
            if (destination.id) creep.room.memory.upgraderLastTask = destination.id;
            return creep.room.controller;
        }
        //repair structures
        destination = creep.pos.findClosestByPath(FIND_STRUCTURES, 
            {filter: (target) => { return worthRepair(creep.pos, target) && !isUnderRepair(target) && !isBlocked(creep,target); }}
        );
        if (destination) {
            creep.memory.repair = true;
            if (destination.id) creep.room.memory.upgraderLastTask = destination.id;
            return destination;
        }
        //build structures
        destination = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, 
            {filter: (target) => { return !isBlocked(creep,target); }});
        if (destination) {
            if (destination.id) creep.room.memory.upgraderLastTask = destination.id;
            return destination;
        }
        //upgrade the room controller
        if (creep.room.controller) {
            destination = creep.room.controller;
            if (destination.id) creep.room.memory.upgraderLastTask = destination.id;
            return creep.room.controller;
        }
    }
}

function isUnderRepair(structure) {
    if (!structure) return false;
    if (!(structure.id)) return false;
    var creepsRepairingIt = _(Game.creeps).filter(function(creep) { 
        return creep.memory.repair && creep.memory.destination == structure.id; }
    ).value().length;
    if (creepsRepairingIt) return true;
    return false;
}

function useLink(creep) {
    if (countStructures(creep.room, STRUCTURE_LINK, false) < 2) return false;
    if (!isLinkNear(creep.pos)) return false;
    return true;
}

function hashColor(seed) {
    var hash = MD5(seed);
    var offset = 0;
    var hex; var hsl;
    do {
        hex = hash.substring(0+offset,6+offset);
        hsl = hexToHSL(hex);
        offset++;
    } while (hsl['l'] < 0.6);
    //msg('hashColor',seed+' > '+hex+' > H:'+hsl['h']+', S:'+hsl['s']+', l:'+hsl['l']+' offset:'+offset);
    return '#'+hex;
}

function isBlocked(creep,target) {
    if (!(creep.memory.lastBlockedIds)) return false;
    if (creep.memory.lastBlockedIds.includes(target.id)) return true;
    return false;
}

function memorizeBlockedObject(creep,destination) {
    if (!(creep.memory.lastBlockedIds)) creep.memory.lastBlockedIds = [];
    if (destination.id) {
        creep.memory.lastBlockedIds.push(destination.id);
        if (creep.memory.lastBlockedIds.length > 1) creep.memory.lastBlockedIds.shift();
    }
}

function isLinkNear(pos) {
    var maxRange = 6;
    return pos.findInRange(FIND_MY_STRUCTURES, maxRange, {filter: (link) => {
        return link.structureType == STRUCTURE_LINK;
    }}).length > 0;
}

function nearbyLinkForTransfer(pos) {
    var maxRange = 5;
    var links = pos.findInRange(FIND_MY_STRUCTURES, maxRange, {filter: (link) => {
        return link.structureType == STRUCTURE_LINK && link.store.getFreeCapacity(RESOURCE_ENERGY) >= minTransfer;
    }});
    return pos.findClosestByPath(links);
}

function getEnergySourceNearby(creep, maxRange = 6) {
    var myMinTransfer = minTransferAmount(creep);
    var destinations = creep.pos.findInRange(FIND_DROPPED_RESOURCES, maxRange)
        .concat(creep.pos.findInRange(FIND_MY_STRUCTURES, maxRange, {filter: (link) => {
            return link.structureType == STRUCTURE_LINK && link.store.getUsedCapacity(RESOURCE_ENERGY) >= myMinTransfer;
        }}))
        .concat(creep.pos.findInRange(FIND_TOMBSTONES, maxRange, {filter: (target) => {
            return target.store.getUsedCapacity(RESOURCE_ENERGY) >= myMinTransfer;
        }}));
    if (creep.memory.role == 'upgrader') {
        destinations = destinations.concat(
            creep.pos.findInRange(FIND_MY_STRUCTURES, maxRange, {filter: (structure) => {
                return structure.structureType == STRUCTURE_STORAGE && getEnergy(structure) >= myMinTransfer;
            }})
        );
    }
    return creep.pos.findClosestByPath(destinations);
}

function orderEnergy(creep, destination) {
    //order energy from closest available carrier
    if (    !(destination instanceof Resource)
        &&  creep.store.getFreeCapacity(RESOURCE_ENERGY) >= minTransfer
        &&  !(creep.memory.awaitingDeliveryFrom)
        &&  (creep.memory.timeOfLastEnergyReceived || 0) < Game.time
        &&  !getEnergySourceNearby(creep)
    ) {
        var carriers = _(Game.creeps).filter(function(carrier) { 
            return carrier.memory.role == 'carrier' && !isEmpty(carrier) && !hasImportantTask(carrier);
        }).value();
        var carrier = creep.pos.findClosestByPath(carriers);
        if (carrier) {
            carrier.memory.destination = creep.id; //deliver to me
            carrier.memory.destinationSetTime = Game.time;
            creep.memory.awaitingDeliveryFrom = carrier.name; //my carrier
            creep.say(carrier.name);
        }
    }
}

function minTransferAmount(creep) {
    return creep.store.getCapacity(RESOURCE_ENERGY)/10;
}

function getEnergyStructures(room, freeCap=true, sort=false) {
    var structures = room.find(FIND_STRUCTURES, {filter: (structure) => { 
        return (    structure.structureType == STRUCTURE_EXTENSION
                ||  structure.structureType == STRUCTURE_SPAWN
        ) && (!freeCap || !isFull(structure))
        ;
    }});
    
    if (sort) {
        return structures.sort(function(x, y) {
            return rangeToSource(x.pos) - rangeToSource(y.pos);
        });
    } else {
        return structures;
    }
}

function getGlobalEnergyStructures() {
    var structures = [];
    for(const i in Game.rooms) {
        var room = Game.rooms[i];
        structures = structures.concat(
            room.find(FIND_STRUCTURES, {filter: (structure) => { 
                return (    structure.structureType == STRUCTURE_EXTENSION
                        ||  structure.structureType == STRUCTURE_SPAWN
                ) && !isFull(structure)
                ;
            }})
        );
    }
    return structures;
}

function rangeToSource(pos) {
    return pos.getRangeTo(pos.findClosestByPath(FIND_SOURCES));
}

function shuffle(unshuffled) {
    return unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    ;
}

function canHarvestInRoom(room) {
    if (!(room.controller)) return true; //no controller
    if (room.controller.my) return true; //my controller
    if (!(room.controller.owner)) return true; //no owner
    return false;
}

function isRoomSafe(roomName) {
    if (Game.map.getRoomStatus(roomName).status != 'novice') return false;
    if (!(Memory.rooms[roomName])) return true;
    if (Memory.rooms[roomName].hostilesPresent) return false;
    return true;
}

function getExit(pos) {
    var exits = Game.map.describeExits(pos.roomName);
    var accessibleRooms = Object.values(exits).filter(roomName => isRoomSafe(roomName));
    var destinationRoomName = randomItem(accessibleRooms);
    var findExit = Game.map.findExit(pos.roomName, destinationRoomName);
    if (findExit == ERR_NO_PATH) {
        msg(pos, 'no path between rooms: '+pos.roomName+' - '+destinationRoomName);
        return null;
    } else {
        return pos.findClosestByPath(findExit);
    }
}

function randomItem(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function updateConstructionSiteScoreForCreep(creep) {
    var creepX = creep.pos.x;
    var creepY = creep.pos.y;
    //lower the score for the occupied position and increase the score in the surrounding positions
    //the sum of the changes should add up to 0
    for (var x = creepX-1; x <= creepX+1; x++) {
        for (var y = creepY-1; y <= creepY+1; y++) {
            var value = (creepX==x && creepY==y) ? -8 : +1;
            updateConstructionSiteScore(creep.room, x, y, value);
        }
    }
    if (isFull(creep) && creep.pos.findInRange(FIND_EXIT,2).length) {
        //full creeps around exits make good sites for links
        var linkPosScore = creep.room.memory.linkPosScore;
        if (!(linkPosScore))                  linkPosScore                  = [];
        if (!(linkPosScore[creepX]))          linkPosScore[creepX]          = [];
        if (!(linkPosScore[creepX][creepY]))  linkPosScore[creepX][creepY]  = 0;
        if (value) linkPosScore[creepX][creepY] += 1;
        creep.room.memory.linkPosScore = linkPosScore;
    }
}

function updateConstructionSiteScore(room,x,y,value) {
    if (!(room.memory.constructionSiteScore))       room.memory.constructionSiteScore       = [];
    if (!(room.memory.constructionSiteScore[x]))    room.memory.constructionSiteScore[x]    = [];
    if (!(room.memory.constructionSiteScore[x][y])) room.memory.constructionSiteScore[x][y] = 0;
    if (value) room.memory.constructionSiteScore[x][y] += value;
}

function getPosForStorage(room) {
    //next to the link, controller and upgrader spots
    if (!(room)) return null;
    if (!(room.controller)) return null;
    
    var link = room.controller.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if (!link) link = room.controller.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_LINK}});
    if (!link) return null;
    if (link.pos.getRangeTo(room.controller.pos) > 6) return null;
    
    var targetPos = link.pos;
    var range = 1; //next to the link
    var bestScore = -1;
    var bestPos = null;
    const terrain = new Room.Terrain(room.name);

    for (var x = targetPos.x-range; x <= targetPos.x+range; x++) {
        for (var y = targetPos.y-range; y <= targetPos.y+range; y++) {
            if (x == targetPos.x && y == targetPos.y) continue;
            if (terrain.get(x,y) == TERRAIN_MASK_WALL) continue;
            var pos = new RoomPosition(x,y,room.name);
            var score = workSpotsAround(pos,'upgrader');
            if (hasStructureInRange(pos, null, 1, true)) score -= 0.1;
            if (bestScore < score) {
                bestScore = score;
                bestPos = pos;
            }
        }
    }
    
    return bestPos;
}

function getPrimaryPosForLink(room) {
    //around controller and sources
    var range = 3;
    const terrain = new Room.Terrain(room.name);

    var placesRequiringLink = [];
    if (room.controller) placesRequiringLink.push(room.controller);
    placesRequiringLink = placesRequiringLink.concat( shuffle(room.find(FIND_SOURCES)) );
    
    for (let i = 0; i < placesRequiringLink.length; i++) {
        var target = placesRequiringLink[i];
        if (target && !hasStructureInRange(target.pos, STRUCTURE_LINK, 6, true)) {
            var targetPos = target.pos;
            var bestScore = -1; 
            var bestPos = null;
    
            for (var x = targetPos.x-range; x <= targetPos.x+range; x++) {
                for (var y = targetPos.y-range; y <= targetPos.y+range; y++) {
                    if (x == targetPos.x && y == targetPos.y) continue;
                    if (terrain.get(x,y) == TERRAIN_MASK_WALL) continue;
                    var pos = new RoomPosition(x,y,room.name);
                    var role = (target instanceof StructureController ? 'upgrader' : 'harvester');
                    var score = workSpotsAround(pos,role);
                    if (hasStructureInRange(pos, null, 1, true)) score -= 0.1;
                    if (bestScore < score) {
                        bestScore = score;
                        bestPos = pos;
                    }
                }
            }
            
            if (bestPos) return bestPos;
        }
    }
}

function workSpotsAround(pos,role) {
    var spots = (role == 'upgrader') ? Memory.rooms[pos.roomName].upgraderSpots : Memory.rooms[pos.roomName].harvesterSpots;
    var spotsAround = 0;
    spots.forEach(spot => {
        if (pos.getRangeTo(spot.x, spot.y)==1) spotsAround++;
    });
    return spotsAround;
}

function hasStructureInRange(pos, structureType, range, includeConstructionSites) {
    if (pos.findInRange(FIND_MY_STRUCTURES, range, {filter: (structure) => {
        return (!structureType || structure.structureType == structureType);
    }}).length > 0) return true;

    if (includeConstructionSites && pos.findInRange(FIND_MY_CONSTRUCTION_SITES, range, {filter: (structure) => {
        return (!structureType || structure.structureType == structureType);
    }}).length > 0) return true;
}

function getPosForContainer(room) {
    var spots = shuffle(room.memory.harvesterSpots);
    for (let i = 0; i < spots.length; i++) {
        var spot = spots[i];
        var pos = new RoomPosition(spot.x, spot.y, spot.roomName);
        if (pos.lookFor(LOOK_STRUCTURES).length) continue;
        if (pos.lookFor(LOOK_CONSTRUCTION_SITES).length) continue;
        return pos;
    }
    return null;
}

function adjustConstructionSiteScoreForLink(score, pos) {
    //distance to exit decreases the score
    var penalty = pos.findClosestByPath(FIND_EXIT);
    if (penalty) {
        score /= pos.getRangeTo(penalty);
    }
    //distance to other links increases the score
    var bonus = pos.findClosestByRange([
        pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}}) ,
        pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_LINK}})
    ]);
    if (bonus) {
        score *= pos.getRangeTo(bonus);
    }
    return score;
}

function getPosForConstruction(room, structureType) {
    if (structureType == STRUCTURE_LINK) {
        var linkPos = getPrimaryPosForLink(room);
        if (linkPos) return linkPos;
    }
    if (structureType == STRUCTURE_STORAGE) return getPosForStorage(room);
    if (structureType == STRUCTURE_CONTAINER) return getPosForContainer(room);
    
    var scores = room.memory.constructionSiteScore;
    var bestScore = Number.NEGATIVE_INFINITY;
    var bestPos;
    
    for (var x = 2; x <= 47; x++) {
        for (var y = 2; y <= 47; y++) {
            if ((x+y) % 2 == 1) continue; //build in a checkered pattern to allow passage
            updateConstructionSiteScore(room,x,y,0);
            var pos = room.getPositionAt(x, y);
            if (!isPosSuitableForConstruction(pos)) continue;
            var score = scores[x][y];

            if (structureType == STRUCTURE_LINK) {
                score = adjustConstructionSiteScoreForLink(score, pos);
            } else if (structureType == STRUCTURE_EXTENSION) {
                //distance to source decreases the score
                var extensionPenalty = pos.findClosestByRange(FIND_SOURCES);
                if (extensionPenalty) {
                    score /= pos.getRangeTo(extensionPenalty);
                }
            }

            if (bestScore < score) {
                bestScore = score;
                bestPos = pos;
            }
        }
    }
    
    return bestPos;
}

function isPosSuitableForConstruction(pos) {
    var contents = pos.look();
    for (let i = 0; i < contents.length; i++) {
        var content = contents[i];
        if (content.type != 'terrain') return false;
        if (content.terrain == 'wall') return false;
        if (isWorkerSpot(pos)) return false;
    }
    if (pos.findInRange(FIND_SOURCES, 2).length) return false;
    return true;
}

function isWorkerSpot(pos) {
    var spots = Memory.rooms[pos.roomName].upgraderSpots.concat(Memory.rooms[pos.roomName].harvesterSpots);
    for (let i = 0; i < spots.length; i++) {
        if (pos.x == spots[i].x && pos.y == spots[i].y) return true;
    }
    return false;
}

function getEnergy(object) {
    if (!object) return 0;
    var store = getStore(object);
    if (store) return store.getUsedCapacity(RESOURCE_ENERGY);
    if (object.energy) return object.energy;
    return 0;
}

function getStore(object) {
    if (object instanceof Store) return object;
    if (object.store instanceof Store) return object.store;
    return null;
}

function globalSourceFillRatio() {
    var energy = 0;
    var energyCapacity = 0;
    
    for(const i in Game.rooms) {
        energy         += Game.rooms[i].find(FIND_SOURCES).reduce((aggregated, item) => aggregated + item.energy        , 0 /*initial*/);
        energyCapacity += Game.rooms[i].find(FIND_SOURCES).reduce((aggregated, item) => aggregated + item.energyCapacity, 0 /*initial*/);
    }
    
    return energy/energyCapacity;
}

function handleSpawn(spawn) {
    var room = spawn.room;
    
    //spawn creeps
    if (!(spawn.spawning)) {
        var roleToSpawn = null;
        
        if (getCreepCountByRole('spawner') <= 0) roleToSpawn='spawner';
        else if (carriersNeeded()) roleToSpawn='carrier';
        else if (globalSourceFillRatio() >= 0.70 && storedEnergy() < 250000) roleToSpawn='harvester';
        else roleToSpawn='upgrader';
        
        var costOfCurrentCreepsInTheRole = Object.values(Game.creeps).reduce((aggregated, item) => 
            aggregated + (item.memory.role == roleToSpawn ? bodyCost(item.body.map(part => part.type)) : 0), 0 /*initial*/) || 0;
        var budget = Math.min(costOfCurrentCreepsInTheRole/2, room.energyCapacityAvailable);
        
        if (!(room.memory.roleToSpawn) || room.memory.roleToSpawn != roleToSpawn) {
            msg(spawn, 'Next role to spawn: '+roleToSpawn+', energy budget: '+budget);
            room.memory.roleToSpawn = roleToSpawn;
        }
        
        if (room.energyAvailable >= budget) spawnCreep(spawn, roleToSpawn, room.energyAvailable);
    }
}

function carriersNeeded() {
    return getEnergySources(100).length >= 2;
}

function spawnCreep(spawn,roleToSpawn,energyAvailable) {
    /*  https://screeps.com/forum/topic/3044/how-does-each-bodypart-affect-fatigue/4
    Each body part except MOVE and empty CARRY generate fatigue.
    1 point per body part on roads, 2 on plain land, 10 on swamp.
    Each MOVE body part decreases fatigue points by 2 per tick.
    The creep cannot move when its fatigue is greater than zero.    */
    var ratios;
    if      (roleToSpawn == 'harvester') ratios = {move:4, work:3, carry:1};
    else if (roleToSpawn == 'upgrader' ) ratios = {move:2, work:3, carry:1};
    else if (roleToSpawn == 'carrier' || roleToSpawn == 'spawner' ) ratios = {move:1, carry:1};

    var body = bodyByRatio(ratios, energyAvailable);
    var energyStructures = getEnergyStructures(spawn.room, false, true);
    var name = nameForCreep(roleToSpawn);
    
    if (spawn.spawnCreep(body, name, { memory: {role:roleToSpawn}, energyStructures: energyStructures }) == OK) {
        msg(spawn, 'Spawning: '+roleToSpawn+' ('+name+'), cost: '+bodyCost(body)+'/'+energyAvailable+'/'+spawn.room.energyCapacityAvailable);
    }
}

function msg(context, msg, email=false) {
    if (!msg) return;

    var contextDescription = '';
    if (context) {
        if (context.name) {
            contextDescription += context.name;
        } else {
            contextDescription += context;
        }
        if (context.room && context.room.name) contextDescription += ' @ '+context.room.name;
        if (contextDescription) contextDescription += ': ';
    }

    var finalMsg = Game.time+' '+contextDescription+msg;
    console.log(finalMsg);
    if (email) Game.notify(finalMsg);
}

function nameForCreep(role) {
    var characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var name = role.substring(0,1);
    while (Game.creeps[name]) {
        name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return name;
}

function construct(room,structureType) {
    if (needStructure(room,structureType)) {
        var pos = getPosForConstruction(room,structureType);
        if (!pos) return;
        msg(room,'Creating a construction site for '+structureType+' at '+pos);
        pos.lookFor(LOOK_STRUCTURES).forEach(structure => {
            if (structure instanceof StructureExtension) {
                msg(structure,'destroying to make space for: '+structureType);
                structure.destroy();
            }
        });
        pos.createConstructionSite(structureType);
    }
}

function needStructure(room,structureType) {
    if (!(room.controller)) return false; //no controller
    if (!(room.controller.my) && room.controller.owner) return false; //owned by others
    var targetCount = CONTROLLER_STRUCTURES[structureType][room.controller.level];
    return targetCount > countStructures(room, structureType, true);
}

function countStructures(room, structureType, includeConstructionSites) {
    var count = room.find(FIND_MY_STRUCTURES, {filter: {structureType: structureType}}).length;
    if (includeConstructionSites) count += room.find(FIND_MY_CONSTRUCTION_SITES, {filter: {structureType: structureType}}).length;
    return count;
}

function getCreepCountByRole(role,inactiveOnly=false) {
    return _(Game.creeps).filter(function(creep) { 
        return creep.memory.role == role && (!inactiveOnly || creep.memory.lastActionOutcome != OK);
    }).value().length;
}

function bodyCost(body) {
    return body.reduce(function (cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
}

function onlyUnique(value, index, self) {
    /*  usage example:
        var a = ['a', 1, 'a', 2, '1'];
        var unique = a.filter(onlyUnique);
        console.log(unique); // ['a', 1, 2, '1']
    */
    return self.indexOf(value) === index;
}

function hasImportantTask(creep) {
    var destination = creep.memory.destination;
    if (!destination) return false;
    destination = Game.getObjectById(destination);
    if (!destination) return false;
    return (destination instanceof Creep);
}

function resetDestination(creep) {
    creep.say('❌');
    if (!(creep.memory.destination)) return null;
    var destination = Game.getObjectById(creep.memory.destination);
    creep.memory.destination = null;
    creep.memory.destinationSetTime = Game.time;
    creep.memory.timeArrivedToDestinationProximity = null;
    creep.memory.repair = false;
    if (destination && destination.memory && destination.memory.awaitingDeliveryFrom) {
        destination.memory.awaitingDeliveryFrom = null;
    }
    
    return null;
}

function isEmpty(object) { 
    if (!object) return null;
    var store = getStore(object);
    if (!store) return null;
    return store.getUsedCapacity(RESOURCE_ENERGY) <= 0; 
}
function isFull(object) { 
    if (!object) return null;
    var store = getStore(object);
    if (!store) return null;
    return store.getFreeCapacity(RESOURCE_ENERGY) <= 0; 
}
function fillRatio(object) {
    if (!object) return null;
    var store = getStore(object);
    if (!store) return null;
    return store.getUsedCapacity(RESOURCE_ENERGY) / store.getCapacity(RESOURCE_ENERGY);
}

//  https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-file-hash-in-javascript-node-js
// eslint-disable-next-line semi, no-extra-semi, quotes
function MD5(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

function hexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return {h:h, s:s, l:l};
}