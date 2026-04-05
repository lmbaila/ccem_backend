"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var dashboards, _i, dashboards_1, d, services, _a, services_1, s, teams, _b, teams_1, t, allTeams, technicians, _loop_1, _c, technicians_1, tech, salt, users, _d, _e, users_1, u;
        var _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    console.log('🌱 Seeding data...');
                    dashboards = [
                        { name: 'Dynatrace', description: 'APM' },
                        { name: 'Grafana', description: 'Dashboards' },
                        { name: 'SolarWinds', description: 'Network & Servers' },
                        { name: 'DCP Eagle', description: 'Critical Services Monitor' },
                    ];
                    _i = 0, dashboards_1 = dashboards;
                    _j.label = 1;
                case 1:
                    if (!(_i < dashboards_1.length)) return [3 /*break*/, 4];
                    d = dashboards_1[_i];
                    return [4 /*yield*/, prisma.dashboard.upsert({
                            where: { name: d.name },
                            update: {},
                            create: d,
                        })];
                case 2:
                    _j.sent();
                    _j.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    services = [
                        { name: 'OIC Transfer', description: 'Interbank transfers' },
                        { name: 'EDM Credelec', description: 'Prepaid energy' },
                        { name: 'EMOLA', description: 'Mobile payments' },
                        { name: 'Mpesa', description: 'Mobile money' },
                        { name: 'RTM', description: 'Real Time Monitor' },
                        { name: 'Credit Card Payment', description: 'Card payments' },
                    ];
                    _a = 0, services_1 = services;
                    _j.label = 5;
                case 5:
                    if (!(_a < services_1.length)) return [3 /*break*/, 8];
                    s = services_1[_a];
                    return [4 /*yield*/, prisma.service.upsert({
                            where: { name: s.name },
                            update: {},
                            create: s,
                        })];
                case 6:
                    _j.sent();
                    _j.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    teams = [{ name: 'NOC' }, { name: 'SRE' }, { name: 'Payments' }];
                    _b = 0, teams_1 = teams;
                    _j.label = 9;
                case 9:
                    if (!(_b < teams_1.length)) return [3 /*break*/, 12];
                    t = teams_1[_b];
                    return [4 /*yield*/, prisma.team.upsert({
                            where: { name: t.name },
                            update: {},
                            create: t,
                        })];
                case 10:
                    _j.sent();
                    _j.label = 11;
                case 11:
                    _b++;
                    return [3 /*break*/, 9];
                case 12: return [4 /*yield*/, prisma.team.findMany()];
                case 13:
                    allTeams = _j.sent();
                    technicians = [
                        { name: 'Carlos Matavele', code: 'T001', email: 'carlos@sb.co.mz', teamName: 'NOC' },
                        { name: 'Ana Tome', code: 'T002', email: 'ana@sb.co.mz', teamName: 'SRE' },
                        { name: 'Joao Nunes', code: 'T003', email: 'joao@sb.co.mz', teamName: 'Payments' },
                        { name: 'Sandra Muianga', code: 'T004', email: 'sandra@sb.co.mz', teamName: 'NOC' },
                    ];
                    _loop_1 = function (tech) {
                        var team;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    team = allTeams.find(function (t) { return t.name === tech.teamName; });
                                    if (!team)
                                        return [2 /*return*/, "continue"];
                                    return [4 /*yield*/, prisma.technician.upsert({
                                            where: { email: tech.email },
                                            update: {},
                                            create: {
                                                name: tech.name,
                                                code: tech.code,
                                                email: tech.email,
                                                teamId: team.id,
                                            },
                                        })];
                                case 1:
                                    _k.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _c = 0, technicians_1 = technicians;
                    _j.label = 14;
                case 14:
                    if (!(_c < technicians_1.length)) return [3 /*break*/, 17];
                    tech = technicians_1[_c];
                    return [5 /*yield**/, _loop_1(tech)];
                case 15:
                    _j.sent();
                    _j.label = 16;
                case 16:
                    _c++;
                    return [3 /*break*/, 14];
                case 17: return [4 /*yield*/, bcrypt.genSalt(10)];
                case 18:
                    salt = _j.sent();
                    _f = {
                        username: 'a830919',
                        firstname: 'Lazaro',
                        lastname: 'Mbaila',
                        email: 'lazaro@sb.co.mz'
                    };
                    return [4 /*yield*/, bcrypt.hash('admin123', salt)];
                case 19:
                    _d = [
                        (_f.password = _j.sent(),
                            _f.role = client_1.Role.ADMIN,
                            _f)
                    ];
                    _g = {
                        username: 'c830920',
                        firstname: 'Joao',
                        lastname: 'Mabote',
                        email: 'joao@sb.co.mz'
                    };
                    return [4 /*yield*/, bcrypt.hash('cmd123', salt)];
                case 20:
                    _d = _d.concat([
                        (_g.password = _j.sent(),
                            _g.role = client_1.Role.COMMANDCENTRE,
                            _g)
                    ]);
                    _h = {
                        username: 'v830921',
                        firstname: 'Maria',
                        lastname: 'Silva',
                        email: 'maria@sb.co.mz'
                    };
                    return [4 /*yield*/, bcrypt.hash('view123', salt)];
                case 21:
                    users = _d.concat([
                        (_h.password = _j.sent(),
                            _h.role = client_1.Role.VIEWER,
                            _h)
                    ]);
                    _e = 0, users_1 = users;
                    _j.label = 22;
                case 22:
                    if (!(_e < users_1.length)) return [3 /*break*/, 25];
                    u = users_1[_e];
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { username: u.username },
                            update: {},
                            create: u,
                        })];
                case 23:
                    _j.sent();
                    _j.label = 24;
                case 24:
                    _e++;
                    return [3 /*break*/, 22];
                case 25:
                    console.log('✅ Seed completed successfully.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
