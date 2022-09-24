/*  ToDo:

use TypeScript to avoid mistakes like: let foo=[]; foo+=1; (1)
    https://github.com/screepers/screeps-typescript-starter
*/

//  https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-file-hash-in-javascript-node-js
// eslint-disable-next-line semi, no-extra-semi, quotes, no-unused-vars, no-undef, no-var, max-len
var MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

//  To disable "File is a CommonJS module; it may be converted to an ES module. ts(80001)"
//  disable setting: JavaScript › Validate: Enable > Enable/disable JavaScript validation.
module.exports.loop = function () {
    for (const i in Game.creeps) handleHarvester(Game.creeps[i]) || handleCreep(Game.creeps[i]);
    for (const i in Game.spawns) handleSpawn(Game.spawns[i]);
    for (const i in Game.rooms) handleRoom(Game.rooms[i]);
};

function getReservableControllers() {
    let roomNames = shuffle(Object.keys(Game.rooms));
    let controllers = [];
    for (const r in roomNames) {
        let controller = Game.rooms[r].controller;
        if (!(controller)) continue;
        if (controller.my) continue;
        if (controller.reservation) continue;
        controllers.push(controller);
    }
    return controllers;
}

function handleHarvester(creep) {
    if (creep.memory.role !== 'harvester') return false;
    if (creep.spawning) return true;
    //move
    let destination = new RoomPosition(creep.memory.targetPos.x, creep.memory.targetPos.y, creep.memory.targetPos.roomName);
    let pathColor = hashColor(creep.memory.role);
    creep.moveTo(destination, { visualizePathStyle: { stroke: pathColor } });
    if (!isEmpty(creep)) {
        //repair
        let repairFilter = { filter: (target) => { return target.my !== false && target.hits < target.hitsMax; } };
        let target = creep.pos.findClosestByPath(creep.pos.findInRange(FIND_STRUCTURES, 3, repairFilter));
        if (target) creep.repair(target);
        //build
        target = creep.pos.findClosestByPath(creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 3));
        //upgrade controller
        if (creep.room.controller) creep.upgradeController(creep.room.controller);
        //transfer
        if (isFull(creep)) unloadCreep(creep);
    }
    //harvest
    creep.harvest(Game.getObjectById(creep.memory.sourceId));
    //done
    return true;
}

function unloadCreep(creep) {
    let pos = creep.pos;
    let destination = pos.findClosestByPath( //link
        pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (target) => { return !isFull(target) && target.my !== false && target.structureType === STRUCTURE_LINK; }
        })
    );
    if (destination) { creep.transfer(destination, RESOURCE_ENERGY); return; }
    destination = pos.findClosestByPath( //carrier
        pos.findInRange(FIND_CREEPS, 1, {
            filter: (target) => { return !isFull(target) && target.my !== false && target.memory.role === 'carrier'; }
        })
    );
    if (destination) { creep.transfer(destination, RESOURCE_ENERGY); return; }
    destination = pos.findClosestByPath( //any structure
        pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (target) => { return !isFull(target) && target.my !== false; }
        })
    );
    if (destination) { creep.transfer(destination, RESOURCE_ENERGY); return; }
}

function bodyByRatio(ratios, maxCost) {
    let partAmounts = {};
    let cost = 0;

    for (const part in ratios) {
        partAmounts[part] = 1;
        let partCost = BODYPART_COST[part];
        if (!partCost) {
            msg('bodyByRatio()', "Can't find cost for part: " + part);
            return null;
        }
        cost += BODYPART_COST[part];
        if (isNaN(cost)) return null;
    }

    for (; ;) { //until break
        let nextPart = bodyPartToAddByRatio(ratios, partAmounts);

        if (cost + BODYPART_COST[nextPart] > maxCost) break;

        partAmounts[nextPart]++;
        cost += BODYPART_COST[nextPart];
    }

    let body = [];
    for (const part in partAmounts) {
        for (let x = 1; x <= partAmounts[part]; x++) {
            body.push(part);
        }
    }

    return body;
}

function bodyPartToAddByRatio(ratios, partAmounts) {
    let nextPart = null;
    let minRatio = Number.POSITIVE_INFINITY;

    for (const part in ratios) {
        let ratio = partAmounts[part] / ratios[part];
        if (minRatio > ratio) {
            minRatio = ratio;
            nextPart = part;
        }
    }

    return nextPart;
}

function handleRoom(room) {
    //control towers
    let towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
    for (const i in towers) handleTower(towers[i]);

    handleHostilesInRoom(room);

    //construct structures
    const structureTypes = [STRUCTURE_TOWER, STRUCTURE_EXTENSION, STRUCTURE_LINK, STRUCTURE_STORAGE, STRUCTURE_CONTAINER];
    structureTypes.forEach(structureType => construct(room, structureType));

    //handle links
    handleLinks(room);

    if (!(room.memory.upgradeSpots)) updateUpgradeSpots(room);
    if (!(room.memory.harvestSpots)) updateHarvestSpots(room);

    //room details
    let roomDetails = {
        constructionSiteCount: room.find(FIND_MY_CONSTRUCTION_SITES).length
        , structureCount: room.find(FIND_STRUCTURES).length
        , status: roomStatus(room.name)
        , canHarvest: canHarvestInRoom(room)
    };
    for (const property in roomDetails) {
        let value = roomDetails[property];
        if (room.memory[property] !== value) {
            msg(room, property + ': ' + room.memory[property] + ' ➤ ' + value, true);
            room.memory[property] = value;
        }
    }
}

function handleHostilesInRoom(room) {
    //check for presence of hostiles
    let hostiles = room.find(FIND_HOSTILE_CREEPS).concat(room.find(FIND_HOSTILE_POWER_CREEPS));
    let hostilesPresent = hostiles.length > 0;

    if (room.memory.hostilesPresent !== hostilesPresent) {
        if (hostilesPresent) {
            let hostileOwners = hostiles.map(creep => creep.owner.username).filter(onlyUnique);
            msg(room, hostiles.length + ' hostiles from ' + hostileOwners + ' detected!', true);
        } else {
            msg(room, 'clear from hostiles =)', true);
        }
        room.memory.hostilesPresent = hostilesPresent;
    }

    //enable safe mode if necessary
    if (hostilesPresent) {
        let towerCount = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } }).length;
        if (towerCount <= 0) {
            if (room.controller && room.controller.activateSafeMode() === OK) {
                msg(room.controller, 'safe mode activated!', true);
            }
        }
    }
}

function updateUpgradeSpots(room) {
    if (!(room.controller)) return;
    msg(room, 'Updating upgrade spots');
    let targetPos = room.controller.pos;
    let range = 3;
    const terrain = new Room.Terrain(room.name);
    let spots = [];

    for (let x = targetPos.x - range; x <= targetPos.x + range; x++) {
        for (let y = targetPos.y - range; y <= targetPos.y + range; y++) {
            if (x === targetPos.x && y === targetPos.y) continue;
            if (terrain.get(x, y) === TERRAIN_MASK_WALL) continue;
            let pos = new RoomPosition(x, y, room.name);
            if (spots.includes(pos)) msg(room, pos + ' already listed');
            spots.push(pos);
        }
    }
    room.memory.upgradeSpots = spots;
}

function updateHarvestSpots(room) {
    msg(room, 'Updating harvest spots');
    let range = 1;
    const terrain = new Room.Terrain(room.name);
    let spots = [];

    room.find(FIND_SOURCES).forEach(source => {
        let targetPos = source.pos;

        for (let x = targetPos.x - range; x <= targetPos.x + range; x++) {
            for (let y = targetPos.y - range; y <= targetPos.y + range; y++) {
                if (x === targetPos.x && y === targetPos.y) continue;
                if (terrain.get(x, y) === TERRAIN_MASK_WALL) continue;
                let pos = new RoomPosition(x, y, room.name);
                if (blockedByStructure(pos)) continue;
                if (!containsPosition(spots, pos)) spots.push(pos);
            }
        }
        room.memory.harvestSpots = spots;
    });
}

function blockedByStructure(pos) {
    return pos.lookFor(LOOK_STRUCTURES).filter(structure => OBSTACLE_OBJECT_TYPES.includes(structure.structureType)).length > 0;
}

function containsPosition(list, pos) {
    return list.filter(listPos => listPos.x === pos.x && listPos.y === pos.y).length > 0;
}

function handleLinks(room) {
    //move energy towards lastEnergyConsumingTask
    let lastEnergyConsumingTask = Game.getObjectById(room.memory.lastEnergyConsumingTask);
    if (!lastEnergyConsumingTask) return;
    let links = room.find(FIND_MY_STRUCTURES, { filter: (link) => { return link.structureType === STRUCTURE_LINK; } })
        .sort(function (x, y) { //sort: furthest/upstream -> closest/downstream
            return y.pos.getRangeTo(lastEnergyConsumingTask) - x.pos.getRangeTo(lastEnergyConsumingTask);
        });
    let upstreamIndex = 0;
    let downstreamIndex = links.length - 1;
    while (upstreamIndex < downstreamIndex) {
        let upstreamLink = links[upstreamIndex];
        let downstreamLink = links[downstreamIndex];
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
    let targetFilter = { filter: (target) => { return target.my === false || target.hits < (target.hitsMax / 2); } };
    let targets = []
        .concat(tower.room.find(FIND_CREEPS, targetFilter))
        .concat(tower.room.find(FIND_STRUCTURES, targetFilter))
        .concat(tower.room.find(FIND_POWER_CREEPS, targetFilter))
        .sort(function (x, y) { return targetScore(tower, y) - targetScore(tower, x); })
        ;
    if (targets.length < 1) return;
    let target = targets[0];

    if (target.my === false) {
        tower.attack(target);
    } else if (target instanceof Creep || target instanceof PowerCreep) {
        tower.heal(target);
    } else {
        tower.repair(target);
    }
}

function targetScore(tower, target) {
    let score = -(tower.pos.getRangeTo(target));
    if (target.my === false) score += 10;
    if (target.my === true) score -= 10;
    if (target instanceof Creep) score += target.getActiveBodyparts(HEAL);
    return score;
}

function getDestinationFromMemory(creep) {
    let destination = creep.memory.destination;

    if ((!(creep.memory.empty) && isEmpty(creep)) || (!(creep.memory.full) && isFull(creep))) {
        destination = resetDestination(creep); //replan after getting full/empty
    }

    if (destination) {
        if (typeof destination === 'string') {
            destination = Game.getObjectById(creep.memory.destination);
        } else if ('x' in destination && 'y' in destination && 'roomName' in destination) {
            if (posEquals(creep.pos, destination)) {
                creep.say('🛬');
                destination = resetDestination(creep); //arrived
            } else {
                destination = new RoomPosition(destination.x, destination.y, destination.roomName); //keep going
            }
        }

        if (destination instanceof RoomPosition && creep.room.name !== destination.roomName
            && (destination.x === 0 || destination.x === 49 || destination.y === 0 || destination.y === 49)
        ) {
            //successfully arrived to another room
            creep.say('🌐');
            destination = resetDestination(creep);
        }

        if (creep.memory.action === 'repair' && !needsRepair(destination)) destination = resetDestination(creep);

        if (destination && creep.pos.roomName !== creep.memory.roomName
            && creep.pos.roomName === (destination.roomName || destination.pos.roomName)) {
            /*  we've just arrived to the destination room, let's reconsider the destination,
                now that we can calculate the distances within the room */
            destination = resetDestination(creep);
        }
    }

    return destination;
}

function handleCreep(creep) {
    if (creep.spawning) return;

    let destination = getDestinationFromMemory(creep);

    if (creep.memory.awaitingDeliveryFrom && !(Game.creeps[creep.memory.awaitingDeliveryFrom])) {
        creep.memory.awaitingDeliveryFrom = null; //no longer await delivery from a dead creep
    }

    //create a new plan if situation requires
    if (!destination && !(creep.memory.awaitingDeliveryFrom)) {
        destination = getNewDestination(creep);
        setDestination(creep, destination);
    }

    if (destination) {
        let actionOutcome = action(creep, destination);
        postAction(creep, destination, actionOutcome);

        if ((
            (creep.memory.timeApproachedDestination) > (creep.memory.lastOkActionTime || 0)
            || (destination instanceof RoomPosition && creep.memory.rangeToDestination > 0)
        ) && (creep.memory.timeApproachedDestination) < (Game.time - 10)
        ) {
            creep.say('⌛️');
            resetDestination(creep);
            memorizeBlockedObject(creep, destination);
        }
    }

    memorizeCreepState(creep, destination);
}

function memorizeCreepState(creep, destination) {
    if (((creep.memory.x || -1) !== creep.pos.x) || ((creep.memory.y || -1) !== creep.pos.y)) {
        creep.memory.x = creep.pos.x;
        creep.memory.y = creep.pos.y;
        creep.memory.roomName = creep.pos.roomName;
        creep.memory.lastMoveTime = Game.time;
    }
    creep.memory.empty = isEmpty(creep);
    creep.memory.full = isFull(creep);
    if (destination) {
        let range = creep.pos.getRangeTo(destination);
        if (range) {
            if (creep.memory.rangeToDestination > range) {
                creep.memory.timeApproachedDestination = Game.time;
            }
            creep.memory.rangeToDestination = range;
        }
    }
    updateConstructionSiteScoreForCreep(creep);
}

function posEquals(a, b) {
    if (!a || !b) return false;
    return a.x === b.x && a.y === b.y && a.roomName === b.roomName;
}

function setDestination(creep, destination) {
    if (destination && (creep.memory.destination || creep) !== (destination.id || destination)) {
        creep.memory.destination = (destination.id || destination);
        creep.memory.destinationSetTime = Game.time;
    }
}

function getNewDestination(creep) {
    let role = creep.memory.role;
    let task;

    if (role === 'worker') {
        task = getTaskForWorker(creep);
        if (!task) msg(creep, 'nothing to do!', true);
    } else if (role === 'carrier') {
        task = getTaskForCarrier(creep);
    } else if (role === 'spawner') {
        task = getTaskForSpawner(creep);
    } else if (role === 'reserver') {
        let destination = closest(getReservableControllers());
        if (destination) task = { action: 'reserveController', destination: destination };
    }

    if (task) {
        creep.memory.action = task.action;
        return task.destination;
    }
}

function getTaskForSpawner(creep) {
    let tasks = [];
    if (!isFull(creep)) {
        let task = getEnergySourceTask(minTransferAmount(creep), creep.pos, true, true, false);
        if (task) tasks.push(task);
    }
    if (!isEmpty(creep)) {
        tasks = tasks.concat(getGlobalEnergyStructures().map(d => { return { action: 'transfer', destination: d }; }));
    }
    return closestTask(creep.pos, tasks);
}

function getTaskForCarrier(creep) {
    let tasks = [];
    if (!isFull(creep)) {
        let task = getEnergySourceTask(minTransferAmount(creep), creep.pos, false, false, false);
        if (task) tasks.push(task);
    }
    if (!isEmpty(creep)) {
        tasks = tasks.concat(getEnergyDestinations().map(d => { return { action: 'transfer', destination: d }; }));
    }
    return closestTask(creep.pos, tasks);
}

function closest(pos, options) {
    if (options.length < 1) return null;
    let destination = pos.findClosestByPath(options); //same room
    if (destination) return destination;
    destination = randomItem(options); //another room
    return destination;
}

function closestTask(pos, tasks) {
    let closest = null;
    let minRange = Number.POSITIVE_INFINITY;

    tasks.forEach(task => {
        //this only works inside a single room
        let range = pos.getRangeTo(task.destination);
        if (minRange > range) {
            minRange = range;
            closest = task;
        }
    });

    return closest || randomItem(tasks) /* we don't have ranges between rooms */;
}

function getEnergyDestinations() {
    let targets = [];

    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        let roomTargets = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_TOWER && !isFull(structure);
            }
        });
        if (roomTargets.length < 1) {
            roomTargets = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return !isFull(structure)
                        && (structure.structureType === STRUCTURE_LINK || structure.structureType === STRUCTURE_STORAGE)
                        && !isDownstreamLink(structure);
                }
            });
        }
        if (roomTargets.length < 1) {
            roomTargets = getEnergyStructures(room);
        }
        targets = targets.concat(roomTargets);
    }

    return targets;
}

function getEnergySources(myMinTransfer, allowStorage = false, allowAnyLink = false, allowSource = false) {
    let sources = [];

    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        sources = sources
            .concat(room.find(FIND_DROPPED_RESOURCES, { filter: (resource) => { return getEnergy(resource) >= myMinTransfer; } }))
            .concat(room.find(FIND_TOMBSTONES, { filter: (tomb) => { return getEnergy(tomb) >= myMinTransfer; } }))
            .concat(room.find(FIND_RUINS, { filter: (ruin) => { return getEnergy(ruin) >= myMinTransfer; } }))
            .concat(room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER
                        || (structure.structureType === STRUCTURE_STORAGE && allowStorage)
                        || (structure.structureType === STRUCTURE_LINK && allowAnyLink)
                        || isDownstreamLink(structure)
                    ) && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= myMinTransfer;
                }
            }));
        if (allowSource && canHarvestInRoom(room)) {
            sources = sources.concat(room.find(FIND_SOURCES_ACTIVE));
        }
    }

    return sources;
}

function getEnergySourceTask(myMinTransfer, pos, allowStorage = true, allowAnyLink = true, allowSource = true) {
    let sources = [];

    for (const i in Game.rooms) {
        sources = sources.concat(
            getEnergySourcesInRoom(Game.rooms[i], myMinTransfer, pos, allowStorage, allowAnyLink, allowSource)
        );
    }

    let destination = closest(pos, sources);
    if (!destination) return;

    let action = 'withdraw';
    if (destination instanceof Source) {
        action = 'harvest';
    } else if (destination instanceof Resource) {
        action = 'pickup';
    } else if (destination instanceof RoomPosition) {
        action = 'moveTo';
    }

    return { action: action, destination: destination };
}

function getEnergySourcesInRoom(room, myMinTransfer, pos, allowStorage = true, allowAnyLink = true, allowSource = true) {
    let sources = []
        .concat(room.find(FIND_DROPPED_RESOURCES, { filter: (resource) => { return getEnergy(resource) >= myMinTransfer; } }))
        .concat(room.find(FIND_TOMBSTONES, { filter: (tomb) => { return getEnergy(tomb) >= myMinTransfer; } }))
        .concat(room.find(FIND_RUINS, { filter: (ruin) => { return getEnergy(ruin) >= myMinTransfer; } }))
        .concat(room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER
                    || (structure.structureType === STRUCTURE_STORAGE && allowStorage)
                    || (structure.structureType === STRUCTURE_LINK && allowAnyLink)
                    || isDownstreamLink(structure)
                ) && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= myMinTransfer;
            }
        }));
    if (allowSource && canHarvestInRoom(room)) {
        let activeSources = pos.findInRange(FIND_SOURCES_ACTIVE, 1);
        if (activeSources.length) {
            sources = sources.concat(activeSources);
        } else {
            sources = sources.concat(getAvailableHarvestSpots(room));
        }
    }
    return sources;
}

function action(creep, destination) {
    let actionOutcome;

    if (creep.memory.action === 'repair') {
        actionOutcome = creep.repair(destination);
    } else if (creep.memory.action === 'withdraw') {
        actionOutcome = creep.withdraw(destination, RESOURCE_ENERGY);
        if (actionOutcome === OK) resetSpecificDestinationFromCreeps(destination);
    } else if (creep.memory.action === 'transfer') {
        actionOutcome = transfer(creep, destination);
        if (actionOutcome === OK) resetSpecificDestinationFromCreeps(destination);
    } else if (creep.memory.action === 'upgradeController') {
        actionOutcome = creep.upgradeController(destination);
    } else if (creep.memory.action === 'harvest') {
        actionOutcome = creep.harvest(destination);
        Memory.harvestersNeeded = true; //we need dedicated harvesters
    } else if (creep.memory.action === 'pickup') {
        actionOutcome = creep.pickup(destination);
        if (actionOutcome === OK) resetSpecificDestinationFromCreeps(destination);
    } else if (creep.memory.action === 'moveTo') {
        let pathColor = hashColor(creep.memory.role);
        actionOutcome = creep.moveTo(destination, { visualizePathStyle: { stroke: pathColor } });
    } else if (creep.memory.action === 'build') {
        actionOutcome = creep.build(destination);
    } else if (creep.memory.action === 'reserveController') {
        actionOutcome = creep.reserveController(destination);
    } else if (creep.memory.action) {
        msg(creep, "action() can't handle action: " + creep.memory.action, true);
    } else if (destination) {
        msg(creep, "action() can't handle destination: " + destination, true);
    }

    creep.memory.lastActionOutcome = actionOutcome;
    return actionOutcome;
}

function resetSpecificDestinationFromCreeps(destination) {
    for (const i in Game.creeps) {
        let anotherCreep = Game.creeps[i];
        if (anotherCreep.memory.destination && anotherCreep.memory.destination === destination.id) {
            resetDestination(anotherCreep);
        }
    }
}

function transfer(creep, destination) {
    let actionOutcome = creep.transfer(destination, RESOURCE_ENERGY);
    if (actionOutcome === OK && destination) {
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
    if (actionOutcome === OK) {
        creep.memory.lastOkActionTime = Game.time;
    } else {
        if (actionOutcome === ERR_NOT_IN_RANGE) {
            let pathColor = hashColor(creep.memory.role);
            creep.moveTo(destination, { visualizePathStyle: { stroke: pathColor } });
        } else if (actionOutcome === ERR_FULL) {
            resetDestination(creep);
            handleCreep(creep);
            return;
        } else if (actionOutcome === ERR_NOT_ENOUGH_RESOURCES) {
            resetDestination(creep);
            handleCreep(creep);
            return;
        } else if (actionOutcome === ERR_NO_PATH) {
            creep.say('🚧');
            resetDestination(creep);
        } else if (actionOutcome === ERR_INVALID_TARGET) {
            creep.say('🔎');
            resetDestination(creep);
            if (destination) memorizeBlockedObject(creep, destination);
        } else if (actionOutcome === ERR_TIRED) {
            creep.say('😓');
        } else if (actionOutcome === ERR_NOT_OWNER) {
            creep.say('👮');
            resetDestination(creep);
            creep.memory.destination = getExit(creep.pos);
            creep.memory.destinationSetTime = Game.time;
        }
    }
}

function needsRepair(structure) {
    if (!structure) return false;
    if (structure.my === false) return false;
    if (!(structure.hits)) return false;
    if (!(structure.hitsMax)) return false;
    if (structure.hits >= structure.hitsMax) return false;
    return true;
}

function worthRepair(pos, structure) {
    if (!needsRepair(structure)) return false;
    let maxHpRatio = 1 - (pos.getRangeTo(structure) - 5) / 100;
    if ((maxHpRatio || 0) < 0.5) maxHpRatio = 0.5;
    if (structure.hits / structure.hitsMax > maxHpRatio) return false;
    return true;
}

function isDownstreamLink(link) {
    if (link instanceof StructureLink) {
        return hasStructureInRange(link.pos, STRUCTURE_CONTROLLER, 6, false);
    }
    return false;
}

function getRepairTaskInRange(pos) {
    let destination = pos.findClosestByPath(
        pos.findInRange(FIND_STRUCTURES, 3, {
            filter: (target) => { return target.my !== false && target.hits < target.hitsMax; }
        })
    );
    if (destination) {
        return { action: 'repair', destination: destination };
    }
}

function getBuildTaskInRange(pos) {
    let destination = pos.findClosestByPath(pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 3));
    if (destination) {
        return { action: 'build', destination: destination };
    }
}

function getUpgradeTask(pos, urgentOnly) {
    let targets = [];
    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        if (!(room.controller)) continue;
        if (!(room.controller.my)) continue;
        if (urgentOnly && room.controller.ticksToDowngrade > 2000) continue;
        targets.push(room.controller);
    }
    let destination = closest(pos, targets);
    if (destination) return { action: 'upgradeController', destination: destination };
}

function getAvailableHarvestSpots(room) {
    let spots = room.memory.harvestSpots;
    let availableSpots = [];

    spots.forEach(spot => {
        let pos = new RoomPosition(spot.x, spot.y, spot.roomName);
        if (pos.findInRange(FIND_SOURCES_ACTIVE, 1).length >= 1
            && pos.lookFor(LOOK_CREEPS).length < 1
            && !creepsOnWayToPos(pos)) {

            availableSpots.push(pos);
        }
    });

    return availableSpots;
}

function creepsOnWayToPos(pos) {
    for (const i in Game.creeps) {
        let creep = Game.creeps[i];
        if (posEquals(creep.memory.destination, pos)) return true;
    }
    return false;
}

function getRepairTask(creep) {
    let destinations = [];

    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        destinations = destinations
            .concat(room.find(FIND_STRUCTURES, {
                filter: (target) => {
                    return worthRepair(creep.pos, target) && !isUnderRepair(target) && !isBlocked(creep, target);
                }
            }));
    }

    let destination = closest(creep.pos, destinations);
    if (!destination) return;

    return { action: 'repair', destination: destination };
}

function getTaskForWorker(creep) {
    if (isFull(creep)) { //spend energy without moving
        let task = getRepairTaskInRange(creep.pos) || getBuildTaskInRange(creep.pos);
        if (task) return task;
    }

    //order more energy
    if (!useLink(creep)) orderEnergy(creep);

    if (isEmpty(creep) && !(creep.memory.awaitingDeliveryFrom)) {
        //fetch nearby energy
        let task = getEnergySourceTask(minTransferAmount(creep), creep.pos);
        if (task) {
            return task;
        }
        return { action: 'moveTo', destination: getExit(creep.pos) };
    } else if (!isEmpty(creep)) {
        //upgrade the room controller if it's about to downgrade
        let task = getUpgradeTask(creep.pos, true);
        //repair structures
        if (!task) task = getRepairTask(creep);
        //build structures
        if (!task) {
            let destination = closest(creep.pos, getConstructionSites(creep));
            if (destination) task = { action: 'build', destination: destination };
        }
        //upgrade the room controller
        if (!task) task = getUpgradeTask(creep.pos, false);
        //return the final destination
        if (task) {
            if (task.destination.id) {
                let destinationRoomName = task.destination.roomName || task.destination.pos.roomName;
                Memory.rooms[destinationRoomName].lastEnergyConsumingTask = task.destination.id;
            }
            return task;
        }
    }
}

function getConstructionSites(creep) {
    let sites = [];
    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        sites = sites.concat(
            room.find(FIND_MY_CONSTRUCTION_SITES, { filter: (target) => { return !isBlocked(creep, target); } })
        );
    }
    return sites;
}

function isUnderRepair(structure) {
    if (!structure) return false;
    if (!(structure.id)) return false;
    let creepsRepairingIt = Object.values(Game.creeps).filter(function (creep) {
        return creep.memory.action === 'repair' && creep.memory.destination === structure.id;
    }).length;
    if (creepsRepairingIt) return true;
    return false;
}

function useLink(creep) {
    if (countStructures(creep.room, STRUCTURE_LINK, false) < 2) return false;
    if (!isLinkNear(creep.pos)) return false;
    return true;
}

function hashColor(seed) {
    let hash = MD5(seed);
    let offset = 0;
    let hex; let hsl;
    do {
        hex = hash.substring(0 + offset, 6 + offset);
        hsl = hexToHSL(hex);
        offset++;
    } while (hsl['l'] < 0.6);
    //msg('hashColor',seed+' > '+hex+' > H:'+hsl['h']+', S:'+hsl['s']+', l:'+hsl['l']+' offset:'+offset);
    return '#' + hex;
}

function isBlocked(creep, target) {
    if (!(creep.memory.lastBlockedIds)) return false;
    if (creep.memory.lastBlockedIds.includes(target.id)) return true;
    return false;
}

function memorizeBlockedObject(creep, destination) {
    if (!(creep.memory.lastBlockedIds)) creep.memory.lastBlockedIds = [];
    if (destination && destination.id) {
        creep.memory.lastBlockedIds.push(destination.id);
        if (creep.memory.lastBlockedIds.length > 1) creep.memory.lastBlockedIds.shift();
    }
}

function isLinkNear(pos) {
    let maxRange = 6;
    return pos.findInRange(FIND_MY_STRUCTURES, maxRange, {
        filter: (link) => {
            return link.structureType === STRUCTURE_LINK;
        }
    }).length > 0;
}

function orderEnergy(creep) {
    //order energy from closest available carrier
    if (creep.memory.role === 'worker'
        && !(creep.memory.awaitingDeliveryFrom)
        && (creep.memory.timeOfLastEnergyReceived || 0) < Game.time
        && creep.store.getFreeCapacity(RESOURCE_ENERGY) >= minTransferAmount(creep)
    ) {
        let carriers = Object.values(Game.creeps).filter(function (carrier) {
            return carrier.memory.role === 'carrier' && !isEmpty(carrier) && !hasImportantTask(carrier);
        });
        let carrier = creep.pos.findClosestByPath(carriers);
        if (carrier) {
            carrier.memory.action = 'transfer';
            carrier.memory.destination = creep.id; //deliver to me
            carrier.memory.destinationSetTime = Game.time;
            creep.memory.awaitingDeliveryFrom = carrier.name; //my carrier
            creep.say(carrier.name);
        }
    }
}

function minTransferAmount(creep) {
    return creep.store.getCapacity(RESOURCE_ENERGY) / 10;
}

function getEnergyStructures(room, freeCap = true, sort = false) {
    let structures = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_EXTENSION
                || structure.structureType === STRUCTURE_SPAWN
            ) && (!freeCap || !isFull(structure));
        }
    });

    if (sort) {
        return structures.sort(function (x, y) {
            return rangeToSource(x.pos) - rangeToSource(y.pos);
        });
    } else {
        return structures;
    }
}

function getGlobalEnergyStructures() {
    let structures = [];
    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        structures = structures.concat(
            room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_SPAWN
                    ) && !isFull(structure);
                }
            })
        );
    }
    return structures;
}

function rangeToSource(pos) {
    return pos.getRangeTo(pos.findClosestByPath(FIND_SOURCES));
}

function shuffle(unshuffled) {
    if (!unshuffled) return unshuffled;

    return unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function canHarvestInRoom(room) {
    if (!(room.controller)) return true; //no controller
    if (room.controller.my) return true; //my controller
    if (!(room.controller.owner) && !(room.controller.reservation)) return true; //no owner & no reservation
    return false;
}

function roomStatus(roomName) {
    return Game.map.getRoomStatus(roomName).status;
}

function isRoomSafe(roomName, currentRoomName) {
    if (roomStatus(currentRoomName) === 'novice' && roomStatus(roomName) !== 'novice') return false;
    if (roomStatus(roomName) === 'closed') return false;
    if (!(Memory.rooms[roomName])) return true;
    if (Memory.rooms[roomName].hostilesPresent) return false;
    return true;
}

function getExit(pos) {
    let exits = Game.map.describeExits(pos.roomName);
    let accessibleRooms = Object.values(exits).filter(roomName =>
        isRoomSafe(roomName, pos.roomName) && Memory.rooms[roomName].canHarvest);
    let destinationRoomName = randomItem(accessibleRooms);
    let findExit = Game.map.findExit(pos.roomName, destinationRoomName);
    if (findExit === ERR_NO_PATH) {
        msg(pos, 'no path between rooms: ' + pos.roomName + ' - ' + destinationRoomName);
        return null;
    } else {
        return pos.findClosestByPath(findExit);
    }
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function updateConstructionSiteScoreForCreep(creep) {
    let creepX = creep.pos.x;
    let creepY = creep.pos.y;
    //lower the score for the occupied position and increase the score in the surrounding positions
    //the sum of the changes should add up to 0
    for (let x = creepX - 1; x <= creepX + 1; x++) {
        for (let y = creepY - 1; y <= creepY + 1; y++) {
            let value = (creepX === x && creepY === y) ? -8 : +1;
            updateConstructionSiteScore(creep.room, x, y, value);
        }
    }
    if (isFull(creep) && creep.pos.findInRange(FIND_EXIT, 2).length) {
        //full creeps around exits make good sites for links
        let linkPosScore = creep.room.memory.linkPosScore;
        if (!(linkPosScore)) linkPosScore = [];
        if (!(linkPosScore[creepX])) linkPosScore[creepX] = [];
        if (!(linkPosScore[creepX][creepY])) linkPosScore[creepX][creepY] = 0;
        linkPosScore[creepX][creepY] += 1;
        creep.room.memory.linkPosScore = linkPosScore;
    }
}

function updateConstructionSiteScore(room, x, y, value) {
    if (!(room.memory.constructionSiteScore)) room.memory.constructionSiteScore = [];
    if (!(room.memory.constructionSiteScore[x])) room.memory.constructionSiteScore[x] = [];
    if (!(room.memory.constructionSiteScore[x][y])) room.memory.constructionSiteScore[x][y] = 0;
    if (value) room.memory.constructionSiteScore[x][y] += value;
}

function getPosForStorage(room) {
    //next to the link, controller and upgrade spots
    if (!(room)) return null;
    if (!(room.controller)) return null;

    let link = room.controller.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_LINK } });
    if (!link) link = room.controller.pos.findClosestByRange(
        FIND_MY_CONSTRUCTION_SITES, { filter: { structureType: STRUCTURE_LINK } });
    if (!link) return null;
    if (link.pos.getRangeTo(room.controller.pos) > 6) return null;

    let targetPos = link.pos;
    let range = 1; //next to the link
    let bestScore = -1;
    let bestPos = null;
    const terrain = new Room.Terrain(room.name);

    for (let x = targetPos.x - range; x <= targetPos.x + range; x++) {
        for (let y = targetPos.y - range; y <= targetPos.y + range; y++) {
            if (x === targetPos.x && y === targetPos.y) continue;
            if (terrain.get(x, y) === TERRAIN_MASK_WALL) continue;
            let pos = new RoomPosition(x, y, room.name);
            let score = countWorkSpotsAround(pos, 'upgrade');
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
    let range = 3;
    const terrain = new Room.Terrain(room.name);

    let placesRequiringLink = [];
    if (room.controller) placesRequiringLink.push(room.controller);
    placesRequiringLink = placesRequiringLink.concat(shuffle(room.find(FIND_SOURCES)));

    for (let i = 0; i < placesRequiringLink.length; i++) {
        let target = placesRequiringLink[i];
        if (target && !hasStructureInRange(target.pos, STRUCTURE_LINK, 6, true)) {
            let targetPos = target.pos;
            let bestScore = -1;
            let bestPos = null;

            for (let x = targetPos.x - range; x <= targetPos.x + range; x++) {
                for (let y = targetPos.y - range; y <= targetPos.y + range; y++) {
                    if (x === targetPos.x && y === targetPos.y) continue;
                    if (terrain.get(x, y) === TERRAIN_MASK_WALL) continue;
                    let pos = new RoomPosition(x, y, room.name);
                    let task = (target instanceof StructureController ? 'upgrade' : 'harvest');
                    let score = countWorkSpotsAround(pos, task);
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

function countWorkSpotsAround(pos, task) {
    let spots = (task === 'upgrade')
        ? Memory.rooms[pos.roomName].upgradeSpots
        : Memory.rooms[pos.roomName].harvestSpots;
    let spotsAround = 0;
    spots.forEach(spot => {
        if (pos.getRangeTo(spot.x, spot.y) === 1) spotsAround++;
    });
    return spotsAround;
}

function hasStructureInRange(pos, structureType, range, includeConstructionSites) {
    if (pos.findInRange(FIND_MY_STRUCTURES, range, {
        filter: (structure) => {
            return (!structureType || structure.structureType === structureType);
        }
    }).length > 0) return true;

    if (includeConstructionSites && pos.findInRange(FIND_MY_CONSTRUCTION_SITES, range, {
        filter: (structure) => {
            return (!structureType || structure.structureType === structureType);
        }
    }).length > 0) return true;
}

function getPosForContainer(room) {
    let harvestSpots = room.memory.harvestSpots;

    if (!harvestSpots) return;

    let spots = shuffle(harvestSpots);
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        let pos = new RoomPosition(spot.x, spot.y, spot.roomName);
        if (pos.lookFor(LOOK_STRUCTURES).length) continue;
        if (pos.lookFor(LOOK_CONSTRUCTION_SITES).length) continue;
        return pos;
    }
    return;
}

function adjustConstructionSiteScoreForLink(score, pos) {
    //distance to exit decreases the score
    let penalty = pos.findClosestByPath(FIND_EXIT);
    if (penalty) {
        score /= pos.getRangeTo(penalty);
    }
    //distance to other links increases the score
    let bonus = pos.findClosestByRange([
        pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_LINK } }),
        pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, { filter: { structureType: STRUCTURE_LINK } })
    ]);
    if (bonus) {
        score *= pos.getRangeTo(bonus);
    }
    return score;
}

function getPosForConstruction(room, structureType) {
    if (structureType === STRUCTURE_LINK) {
        let linkPos = getPrimaryPosForLink(room);
        if (linkPos) return linkPos;
    }
    if (structureType === STRUCTURE_STORAGE) return getPosForStorage(room);
    if (structureType === STRUCTURE_CONTAINER) return getPosForContainer(room);

    let scores = room.memory.constructionSiteScore;
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestPos;

    for (let x = 2; x <= 47; x++) {
        for (let y = 2; y <= 47; y++) {
            if ((x + y) % 2 === 1) continue; //build in a checkered pattern to allow passage
            updateConstructionSiteScore(room, x, y, 0);
            let pos = room.getPositionAt(x, y);
            if (!isPosSuitableForConstruction(pos)) continue;
            let score = scores[x][y];

            if (structureType === STRUCTURE_LINK) {
                score = adjustConstructionSiteScoreForLink(score, pos);
            } else if (structureType === STRUCTURE_EXTENSION) {
                //distance to source decreases the score
                let extensionPenalty = pos.findClosestByRange(FIND_SOURCES);
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
    let contents = pos.look();
    for (let i = 0; i < contents.length; i++) {
        let content = contents[i];
        if (content.type !== 'terrain') return false;
        if (content.terrain === 'wall') return false;
        if (isWorkerSpot(pos)) return false;
    }
    if (pos.findInRange(FIND_SOURCES, 2).length) return false;
    return true;
}

function isWorkerSpot(pos) {
    let spots = Memory.rooms[pos.roomName].upgradeSpots.concat(Memory.rooms[pos.roomName].harvestSpots);
    for (let i = 0; i < spots.length; i++) {
        if (pos.x === spots[i].x && pos.y === spots[i].y) return true;
    }
    return false;
}

function getEnergy(object) {
    if (!object) return 0;
    let store = getStore(object);
    if (store) return store.getUsedCapacity(RESOURCE_ENERGY);
    if (object.energy) return object.energy;
    return 0;
}

function getStore(object) {
    if (object instanceof Store) return object;
    if (object.store instanceof Store) return object.store;
    return null;
}

function handleSpawn(spawn) {
    let room = spawn.room;

    //spawn creeps
    if (!(spawn.spawning)) {
        let roleToSpawn = null;

        if (getCreepCountByRole('spawner') <= 0) {
            roleToSpawn = 'spawner';
        } else if (carriersNeeded()) {
            roleToSpawn = 'carrier';
        } else if (Memory.reserversNeeded && getCreepCountByRole('reserver') < 1) {
            roleToSpawn = 'reserver';
        } else if (Memory.harvestersNeeded) {
            spawnHarvester(spawn);
            return;
        }
        else roleToSpawn = 'worker';

        let costOfCurrentCreepsInTheRole = Object.values(Game.creeps).reduce((aggregated, item) =>
            aggregated + (item.memory.role === roleToSpawn ? creepCost(item) : 0), 0 /*initial*/) || 0;
        let budget = Math.min(costOfCurrentCreepsInTheRole / 3, room.energyCapacityAvailable);

        if (room.energyAvailable >= budget) spawnCreep(spawn, roleToSpawn, room.energyAvailable);
    }
}

function spawnHarvester(spawn) {
    let roleToSpawn = 'harvester'; //no energy for workers
    let sourceFilter = { filter: (source) => { return !sourceHasHarvester(source); } };
    let sources = [];
    for (const r in Game.rooms) {
        sources = sources.concat(Game.rooms[r].find(FIND_SOURCES, sourceFilter));
    }
    let source = closest(spawn.pos, sources);
    if (!source) {
        Memory.harvestersNeeded = false;
        Memory.reserversNeeded = getReservableControllers() >= 1;
        return false;
    }
    let workParts = source.energyCapacity / ENERGY_REGEN_TIME / HARVEST_POWER;
    let body = [CARRY, MOVE];
    let partsToAdd = [WORK, MOVE];
    for (let x = 1; x <= workParts; x++) {
        let newBody = body.concat(partsToAdd);
        if (bodyCost(newBody) > spawn.room.energyCapacityAvailable) break;
        body = newBody;
    }
    let cost = bodyCost(body);
    if (cost > spawn.room.energyAvailable) return false;
    let energyStructures = getEnergyStructures(spawn.room, false, true);
    let name = nameForCreep(roleToSpawn);
    let memory = { role: roleToSpawn, sourceId: source.id, targetPos: getHarvestSpotForSource(source) };
    if (spawn.spawnCreep(body, name, { memory: memory, energyStructures: energyStructures }) === OK) {
        Memory.harvestersNeeded = false;
        msg(spawn, 'Spawning: ' + roleToSpawn + ' (' + name + '), cost: '
            + bodyCost(body) + '/' + spawn.room.energyAvailable + '/' + spawn.room.energyCapacityAvailable);
    }
    return true;
}

function getHarvestSpotForSource(source) {
    let room = Game.rooms[source.pos.roomName];
    let bestSpot;
    let bestScore = Number.NEGATIVE_INFINITY;
    let targetPos = source.pos;
    let range = 1;
    const terrain = new Room.Terrain(room.name);

    for (let x = targetPos.x - range; x <= targetPos.x + range; x++) {
        for (let y = targetPos.y - range; y <= targetPos.y + range; y++) {
            if (x === targetPos.x && y === targetPos.y) continue;
            if (terrain.get(x, y) === TERRAIN_MASK_WALL) continue;
            let pos = new RoomPosition(x, y, room.name);
            if (blockedByStructure(pos)) continue;
            let score = (hasStructureInRange(pos, STRUCTURE_LINK, 1, true) ? 1 : 0)
                + pos.lookFor(LOOK_STRUCTURES).filter(structure => structure.structureType === STRUCTURE_CONTAINER).length
                + pos.findInRange(FIND_SOURCES, 1).length;
            if (bestScore < score) {
                bestScore = score;
                bestSpot = pos;
            }
        }
    }

    return bestSpot;
}

function sourceHasHarvester(source) {
    for (const i in Game.creeps) {
        let creep = Game.creeps[i];
        if (creep.memory.sourceId === source.id) {
            return true;
        }
    }
    return false;
}

function creepCost(creep) {
    return bodyCost(creep.body.map(part => part.type));
}

function carriersNeeded() {
    return (getEnergySources(100).length / 2) > getCreepCountByRole('carrier');
}

function spawnCreep(spawn, roleToSpawn, energyAvailable) {
    /*  https://screeps.com/forum/topic/3044/how-does-each-bodypart-affect-fatigue/4
    Each body part except MOVE and empty CARRY generate fatigue.
    1 point per body part on roads, 2 on plain land, 10 on swamp.
    Each MOVE body part decreases fatigue points by 2 per tick.
    The creep cannot move when its fatigue is greater than zero.    */
    let ratios;
    if (roleToSpawn === 'worker') ratios = { move: 4, work: 3, carry: 1 };
    else if (roleToSpawn === 'carrier' || roleToSpawn === 'spawner') ratios = { move: 1, carry: 1 };
    else if (roleToSpawn === 'reserver') ratios = { move: 1, claim: 1 };

    let body = bodyByRatio(ratios, energyAvailable);
    let energyStructures = getEnergyStructures(spawn.room, false, true);
    let name = nameForCreep(roleToSpawn);

    if (spawn.spawnCreep(body, name, { memory: { role: roleToSpawn }, energyStructures: energyStructures }) === OK) {
        msg(spawn, 'Spawning: ' + roleToSpawn + ' (' + name + '), cost: '
            + bodyCost(body) + '/' + energyAvailable + '/' + spawn.room.energyCapacityAvailable);
    }
}

function msg(context, msg, email = false) {
    if (!msg) return;

    let contextDescription = '';
    if (context) {
        if (context.name) {
            contextDescription += context.name;
        } else {
            contextDescription += context;
        }
        if (context.room && context.room.name) contextDescription += ' @ ' + context.room.name;
        if (contextDescription) contextDescription += ': ';
    }

    let finalMsg = Game.time + ' ' + contextDescription + msg;
    console.log(finalMsg);
    if (email) Game.notify(finalMsg);
}

function nameForCreep(role) {
    let characters = 'ABCDEFGHJKLMNPQRTUVWXYZ2346789';
    let name = role.substring(0, 1);
    while (Game.creeps[name]) {
        name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return name;
}

function construct(room, structureType) {
    if (needStructure(room, structureType)) {
        let pos = getPosForConstruction(room, structureType);
        if (!pos) return;
        msg(room, 'Creating a construction site for ' + structureType + ' at ' + pos, true);
        pos.lookFor(LOOK_STRUCTURES).forEach(structure => {
            if (structure instanceof StructureExtension) {
                msg(structure, 'destroying to make space for: ' + structureType);
                structure.destroy();
            }
        });
        pos.createConstructionSite(structureType);
    }
}

function needStructure(room, structureType) {
    if (!(room.controller)) return false; //no controller
    if (!(room.controller.my) && room.controller.owner) return false; //owned by others
    let targetCount = CONTROLLER_STRUCTURES[structureType][room.controller.level];
    return targetCount > countStructures(room, structureType, true);
}

function countStructures(room, structureType, includeConstructionSites) {
    let count = room.find(FIND_MY_STRUCTURES, { filter: { structureType: structureType } }).length;
    if (includeConstructionSites) {
        count += room.find(FIND_MY_CONSTRUCTION_SITES, { filter: { structureType: structureType } }).length;
    }
    return count;
}

function getCreepCountByRole(role, inactiveOnly = false) {
    return Object.values(Game.creeps).filter(function (creep) {
        return creep.memory.role === role && (!inactiveOnly || creep.memory.lastActionOutcome !== OK);
    }).length;
}

function bodyCost(body) {
    return body.reduce(function (cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
}

function onlyUnique(value, index, self) {
    /*  usage example:
        let a = ['a', 1, 'a', 2, '1'];
        let unique = a.filter(onlyUnique);
        console.log(unique); // ['a', 1, 2, '1']
    */
    return self.indexOf(value) === index;
}

function hasImportantTask(creep) {
    let destination = creep.memory.destination;
    if (!destination) return false;
    destination = Game.getObjectById(destination);
    if (!destination) return false;
    return (destination instanceof Creep);
}

function resetDestination(creep) {
    //save last values
    creep.memory.lastDestination = creep.memory.destination;
    creep.memory.lastAction = creep.memory.action;
    //reset properties
    if (!(creep.memory.destination)) return null;
    let destination = Game.getObjectById(creep.memory.destination);
    creep.memory.destination = null;
    creep.memory.destinationSetTime = Game.time;
    creep.memory.timeApproachedDestination = null;
    creep.memory.action = null;
    if (destination && destination.memory && destination.memory.awaitingDeliveryFrom) {
        destination.memory.awaitingDeliveryFrom = null;
    }

    return null;
}

function isEmpty(object) {
    if (!object) return null;
    let store = getStore(object);
    if (!store) return null;
    return store.getUsedCapacity(RESOURCE_ENERGY) <= 0;
}
function isFull(object) {
    if (!object) return null;
    let store = getStore(object);
    if (!store) return null;
    return store.getFreeCapacity(RESOURCE_ENERGY) <= 0;
}
function fillRatio(object) {
    if (!object) return null;
    let store = getStore(object);
    if (!store) return null;
    return store.getUsedCapacity(RESOURCE_ENERGY) / store.getCapacity(RESOURCE_ENERGY);
}

function hexToHSL(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}