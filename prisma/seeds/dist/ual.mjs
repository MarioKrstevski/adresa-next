// prisma/seed.ts
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(
          thisArg,
          _arguments || []
        )).next()
      );
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys),
                (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (
                op[0] === 3 &&
                (!t || (op[1] > t[0] && op[1] < t[3]))
              ) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
import { PrismaClient } from "@prisma/client";
import { Argon2id } from "oslo/password";
import {
  a,
  agencyListings,
  aUsers,
  nUsers,
  regularListings,
} from "./data.js";
var prisma = new PrismaClient();
function main() {
  return __awaiter(this, void 0, void 0, function () {
    function hashPasswords() {
      return __awaiter(this, void 0, void 0, function () {
        var argon2id, _i, normalUsers_1, user, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              argon2id = new Argon2id();
              (_i = 0), (normalUsers_1 = normalUsers);
              _b.label = 1;
            case 1:
              if (!(_i < normalUsers_1.length))
                return [3 /*break*/, 4];
              user = normalUsers_1[_i];
              _a = user;
              return [
                4 /*yield*/,
                argon2id.hash(user.hashedPassword),
              ];
            case 2:
              _a.hashedPassword = _b.sent();
              _b.label = 3;
            case 3:
              _i++;
              return [3 /*break*/, 1];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    }
    function hashAPasswords() {
      return __awaiter(this, void 0, void 0, function () {
        var argon2id, _i, agencyUsers_1, user, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              argon2id = new Argon2id();
              (_i = 0), (agencyUsers_1 = agencyUsers);
              _b.label = 1;
            case 1:
              if (!(_i < agencyUsers_1.length))
                return [3 /*break*/, 4];
              user = agencyUsers_1[_i];
              _a = user;
              return [
                4 /*yield*/,
                argon2id.hash(user.hashedPassword),
              ];
            case 2:
              _a.hashedPassword = _b.sent();
              _b.label = 3;
            case 3:
              _i++;
              return [3 /*break*/, 1];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    }
    var normalUsers,
      normalUserPromises,
      agencies,
      agenciesPromises,
      agencyUsers,
      agenciyUsersPromises,
      regularListingsPromises,
      agencyListingsPromises;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          normalUsers = nUsers;
          return [4 /*yield*/, hashPasswords()];
        case 1:
          _a.sent();
          normalUserPromises = nUsers.map(function (user) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      prisma.user.upsert({
                        where: { id: user.id },
                        update: {},
                        create: user,
                      }),
                    ];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          return [4 /*yield*/, Promise.all(normalUserPromises)];
        case 2:
          _a.sent();
          agencies = a;
          agenciesPromises = agencies.map(function (agency) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      prisma.agency.upsert({
                        where: { id: agency.id },
                        update: {},
                        create: agency,
                      }),
                    ];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          return [4 /*yield*/, Promise.all(agenciesPromises)];
        case 3:
          _a.sent();
          agencyUsers = aUsers;
          return [4 /*yield*/, hashAPasswords()];
        case 4:
          _a.sent();
          agenciyUsersPromises = agencyUsers.map(function (user) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      prisma.user.upsert({
                        where: { id: user.id },
                        update: {},
                        create: user,
                      }),
                    ];
                  case 1:
                    _a.sent();
                    console.log("added user", user.id);
                    return [2 /*return*/];
                }
              });
            });
          });
          return [4 /*yield*/, Promise.all(agenciyUsersPromises)];
        case 5:
          _a.sent();
          regularListingsPromises = regularListings.map(function (
            listing
          ) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      prisma.listing.upsert({
                        where: { id: listing.id },
                        update: {},
                        create: __assign(__assign({}, listing), {
                          priceHistory: {
                            prices: [100, 120, 130], // Example JSON
                            dates: ["2021-01-01", "2021-02-01"],
                          },
                        }),
                      }),
                    ];
                  case 1:
                    _a.sent();
                    console.log("added u listing", listing.id);
                    return [2 /*return*/];
                }
              });
            });
          });
          return [4 /*yield*/, Promise.all(regularListingsPromises)];
        case 6:
          _a.sent();
          agencyListingsPromises = agencyListings.map(function (
            listing
          ) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      prisma.listing.upsert({
                        where: { id: listing.id },
                        update: {},
                        create: __assign(__assign({}, listing), {
                          priceHistory: {
                            prices: [100, 120, 130], // Example JSON
                            dates: ["2021-01-01", "2021-02-01"],
                          },
                        }),
                      }),
                    ];
                  case 1:
                    _a.sent();
                    console.log("added a listing", listing.id);
                    return [2 /*return*/];
                }
              });
            });
          });
          return [4 /*yield*/, Promise.all(agencyListingsPromises)];
        case 7:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
main()
  .then(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, prisma.$disconnect()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  })
  .catch(function (e) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.error(e);
            return [4 /*yield*/, prisma.$disconnect()];
          case 1:
            _a.sent();
            process.exit(1);
            return [2 /*return*/];
        }
      });
    });
  });
