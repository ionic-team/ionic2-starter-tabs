var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require("angular2/angular2");
var Friends = (function () {
    function Friends() {
        this.chats = [{
                id: 0,
                name: 'Ben Sparrow',
                lastText: 'You on your way?',
                face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
            }, {
                id: 1,
                name: 'Max Lynx',
                lastText: 'Hey, it\'s me',
                face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
            }, {
                id: 2,
                name: 'Adam Bradleyson',
                lastText: 'I should buy a boat',
                face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
            }, {
                id: 3,
                name: 'Perry Governor',
                lastText: 'Look at my mukluks!',
                face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
            }, {
                id: 4,
                name: 'Mike Harrington',
                lastText: 'This is wicked good ice cream.',
                face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
            }];
    }
    Friends.prototype.all = function () {
        return this.chats;
    };
    Friends.prototype.remove = function (chat) {
        this.chats.splice(this.chats.indexOf(chat), 1);
    };
    Friends = __decorate([
        angular2_1.Injectable()
    ], Friends);
    return Friends;
})();
exports.Friends = Friends;
