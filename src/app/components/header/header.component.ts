import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _MytranslateService = inject(MytranslateService)
  readonly _TranslateService = inject(TranslateService)
  change(lang:string):void {
    this._MytranslateService.changeLang(lang)
  }
}
