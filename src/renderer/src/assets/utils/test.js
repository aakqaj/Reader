var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ChapterQueue = /** @class */ (function () {
    function ChapterQueue(queue) {
        var _this = this;
        this.Queue = new Array(3);
        queue.map(function (item, index) {
            _this.Queue[index] = item;
        });
        if (!queue[1]) {
            throw 'no target item';
        }
    }
    ChapterQueue.prototype.addToEnd = function (item) {
        if (!this.Queue[2]) {
            this.Queue[2] = item;
            return;
        }
        this.Queue[0] = this.Queue[1];
        this.Queue[1] = this.Queue[2];
        this.Queue[2] = item;
    };
    ChapterQueue.prototype.addToStart = function (item) {
        if (!this.Queue[0]) {
            this.Queue[0] = item;
            return;
        }
        this.Queue[2] = this.Queue[1];
        this.Queue[1] = this.Queue[0];
        this.Queue[0] = item;
    };
    ChapterQueue.prototype.clear = function () {
        this.Queue = __spreadArray([], this.Queue.map(function (_) { return undefined; }), true);
    };
    ChapterQueue.prototype.setQueue = function (queue) {
        var _this = this;
        queue.map(function (item, index) {
            _this.Queue[index] = item;
        });
        if (!queue[1]) {
            throw 'no target item';
        }
    };
    ChapterQueue.prototype.getQueue = function () {
        return this.Queue;
    };
    return ChapterQueue;
}());
var cq = new ChapterQueue(["第一章", "第二章", "第三章"]);
cq.addToEnd("第四章");
console.log(cq.getQueue());
cq.addToEnd("第五章");
cq.addToStart("第二章");
console.log(cq.getQueue());
