import {Component, Input} from '@angular/core';
import { Group } from '../../models/group/group.model';
import { Channel } from '../../models/channel/channel.model';

@Component({
  selector: 'app-posts-panel',
  templateUrl: './posts-panel.component.html',
  styleUrl: './posts-panel.component.css'
})
export class PostsPanelComponent {
  @Input() group!: Group | undefined;
  @Input() channel!: Channel | undefined;

}
