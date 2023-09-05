import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'dop-area',
    templateUrl: './drop-area.html',
    styleUrls: ['./drop-area.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropAreaComponent {
}