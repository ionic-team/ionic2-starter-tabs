var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive } from 'angular2/angular2';
import { IonicConfig } from '../../config/config';
import { pointerCoord, hasPointerMoved } from '../../util/dom';
/**
 * TODO
 */
export let Label = class {
    /**
     * TODO
     * @param {IonicConfig} config
     */
    constructor(config) {
        this.scrollAssist = config.setting('keyboardScrollAssist');
    }
    /**
     * TODO
     * @param {TODO} ev  TODO
     */
    pointerStart(ev) {
        if (this.scrollAssist) {
            // remember where the touchstart/mousedown started
            this.startCoord = pointerCoord(ev);
        }
    }
    /**
     * TODO
     * @param {TODO} ev  TODO
     */
    pointerEnd(ev) {
        if (this.container) {
            // get where the touchend/mouseup ended
            let endCoord = pointerCoord(ev);
            // focus this input if the pointer hasn't moved XX pixels
            if (!hasPointerMoved(20, this.startCoord, endCoord)) {
                ev.preventDefault();
                ev.stopPropagation();
                this.container.focus();
            }
            this.startCoord = null;
        }
    }
};
Label = __decorate([
    Directive({
        selector: 'ion-label',
        properties: [
            'id'
        ],
        host: {
            '[attr.id]': 'id',
            'class': 'input-label',
            '(touchstart)': 'pointerStart($event)',
            '(touchend)': 'pointerEnd($event)',
            '(mousedown)': 'pointerStart($event)',
            '(mouseup)': 'pointerEnd($event)'
        }
    }), 
    __metadata('design:paramtypes', [(typeof IonicConfig !== 'undefined' && IonicConfig) || Object])
], Label);