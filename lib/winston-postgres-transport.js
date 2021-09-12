"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @module 'winston-postgres-transport'
 * @fileoverview Winston transport for logging into PostgreSQL
 * @license MIT
 * @author Andrei Tretyakov <andrei.tretyakov@gmail.com>
 */
var moment = require('moment');
var postgres = require('postgres');
var Transport = require('winston-transport');
var callbackify = require('util').callbackify;
var handleCallback = require('./helpers').handleCallback;
/**
 * Class for the Postgres transport object.
 * @class
 * @param {Object} options
 * @param {String} [options.level=info] - Level of messages that this transport
 * should log.
 * @param {Boolean} [options.silent=false] - Boolean flag indicating whether to
 * suppress output.
 * @param {String} options.conString - Postgres connection uri
 * @param {String} [options.tableName='winston_logs'] - The name of the table you
 * want to store log messages in.
 * @param {Array} [options.tableFields=['level', 'msg', 'meta']] - array of the table fields
 * @param {String} [options.label] - Label stored with entry object if defined.
 * @param {String} [options.name] - Transport instance identifier. Useful if you
 * need to create multiple Postgres transports.
 */
var PostgresTransport = /** @class */ (function (_super) {
    __extends(PostgresTransport, _super);
    function PostgresTransport(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        var _a = options.label, label = _a === void 0 ? '' : _a, _b = options.level, level = _b === void 0 ? 'info' : _b, _c = options.silent, silent = _c === void 0 ? false : _c, _d = options.table, table = _d === void 0 ? [
            {
                dataType: 'character varying',
                name: 'level',
            },
            {
                dataType: 'character varying',
                name: 'message',
            },
            {
                dataType: 'json',
                name: 'meta',
            },
            {
                dataType: 'timestamp without time zone',
                default: 'DEFAULT NOW()',
                name: 'timestamp',
            },
        ] : _d, _e = options.tableName, tableName = _e === void 0 ? 'winston_logs' : _e, _f = options.postgresOptions, postgresOptions = _f === void 0 ? {} : _f, postgresUrl = options.postgresUrl;
        //
        // Configure postgres
        //
        if (!postgresUrl) {
            throw new Error('You have to define url connection string');
        }
        var sql = postgres(postgresUrl, postgresOptions);
        var tableFields = table.map(function (tableField) { return tableField.name; });
        Object.assign(_this, {
            label: label,
            level: level,
            silent: silent,
            sql: sql,
            table: table,
            tableFields: tableFields,
            tableName: tableName,
        });
        return _this;
    }
    /**
     * Create logs table method.
     * @return {Promise} result of creation within a Promise
     */
    PostgresTransport.prototype.init = function () {
        var _a = this, sql = _a.sql, tableFields = _a.tableFields, tableName = _a.tableName;
        return sql(__makeTemplateObject(["CREATE TABLE IF NOT EXISTS ", " (\n        ", " character varying,\n        ", " character varying,\n        ", " json,\n        ", " timestamp without time zone DEFAULT NOW()\n    );"], ["CREATE TABLE IF NOT EXISTS ", " (\n        ", " character varying,\n        ", " character varying,\n        ", " json,\n        ", " timestamp without time zone DEFAULT NOW()\n    );"]), sql(tableName), sql(tableFields[0]), sql(tableFields[1]), sql(tableFields[2]), sql(tableFields[3]));
    };
    /**
     * End the connection
     * Return a Promise which resolves when all queries are finished and the underlying connections are closed.
     * @return {Promise} result within a Promise
     */
    PostgresTransport.prototype.end = function (timeout) {
        if (timeout === void 0) { timeout = 0; }
        return this.sql.end({ timeout: timeout });
    };
    /**
     * Flush all logs
     * Return a Promise which resolves when all logs are finished.
     * @return {Promise} result within a Promise
     */
    PostgresTransport.prototype.flush = function () {
        var _a = this, sql = _a.sql, tableName = _a.tableName;
        return sql(__makeTemplateObject(["DELETE FROM ", ";"], ["DELETE FROM ", ";"]), sql(tableName));
    };
    /**
     * Core logging method exposed to Winston. Metadata is optional.
     * @param {Object} info
     * @param {string} [info.level] - Level at which to log the message.
     * @param {string} [info.message] - Message to log
     * @param {Function} callback - Continuation to respond to when complete.
     */
    PostgresTransport.prototype.log = function (info, callback) {
        var _this = this;
        setImmediate(function () {
            _this.emit('logged', info);
        });
        if (this.silent !== true) {
            var _a = this, defaultMeta = _a.defaultMeta, sql_1 = _a.sql, tableFields_1 = _a.tableFields, tableName_1 = _a.tableName;
            var level = info.level, message = info.message, meta = __rest(info, ["level", "message"]);
            var log_1 = {
                level: level,
                message: message,
                meta: JSON.stringify(__assign(__assign({}, meta), defaultMeta)),
                timestamp: 'NOW()',
            };
            var logQuery = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sql_1(__makeTemplateObject(["INSERT INTO ", " ", ""], ["INSERT INTO ", " ", ""]), sql_1(tableName_1), sql_1.apply(void 0, __spreadArray([log_1], tableFields_1, false)))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            logQuery(function (error) {
                if (error) {
                    return handleCallback(callback, error);
                }
                return handleCallback(callback, null, true);
            });
        }
    };
    /**
     * Query the transport. Options object is optional.
     * @param {Object} options - Loggly-like query options for this instance.
     * @param {string} [options.from=epoch] - offset time for the search. Defaults to "epoch".
     * @param {string} [options.until=now] - End time for the search. Defaults to "now".
     * @param {string} [options.rows=100] - Limited number of rows returned by search. Defaults to 100.
     * @param {string} [options.order=desc] - Direction of results returned, either "asc" or "desc".
     * @param {string} [options.fields]
     * @param {Function} callback - Continuation to respond to when complete.
     */
    PostgresTransport.prototype.query = function (options, callback) {
        if (options === void 0) { options = {}; }
        var _a = this, sql = _a.sql, tableFields = _a.tableFields, tableName = _a.tableName;
        var _b = options.fields, fields = _b === void 0 ? [] : _b, _c = options.from, from = _c === void 0 ? new Date(0) : _c, _d = options.until, until = _d === void 0 ? new Date() : _d, _e = options.order, order = _e === void 0 ? 'DESC' : _e, _f = options.rows, rows = _f === void 0 ? 100 : _f;
        var filteredFields = tableFields;
        if (fields.length > 0) {
            filteredFields = filteredFields.filter(function (field) { return fields.includes(field); });
        }
        var queryQuery = callbackify(function () { return sql(__makeTemplateObject(["SELECT ", "\n    FROM ", "\n    WHERE ", " >= ", " \n    AND ", " < ", "\n    ORDER BY ", " ", "\n    LIMIT ", ";"], ["SELECT ", "\n    FROM ", "\n    WHERE ", " >= ", " \n    AND ", " < ", "\n    ORDER BY ", " ", "\n    LIMIT ", ";"]), sql(filteredFields), sql(tableName), sql(tableFields[3]), moment(from)
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS'), sql(tableFields[3]), moment(until)
            .utc()
            .format('YYYY-MM-DD HH:mm:ss.SSS'), sql(tableFields[3]), sql(order), sql(rows)); });
        queryQuery(function (error, data) {
            if (error) {
                return handleCallback(callback, error);
            }
            return handleCallback(callback, null, data);
        });
    };
    return PostgresTransport;
}(Transport));
module.exports = PostgresTransport;
