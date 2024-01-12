import { Component } from '@angular/core';
/**
 * @description Root component of the application
 * @class
 * @component
 */
@Component({
  /**
   * @description The CSS selector that indentifies the component
   * @member {string} selector - The component's selector
   * @memberof AppComponent
   */
  selector: 'app-root',
  /**
   * @description  The URL to the component's HTML template
   * @member {string} templateUrl - The URL to the HTML template
   * @memberof AppComponent
   */
  templateUrl: './app.component.html',
  /**
   * @description The array of URL's to the stylesheets to be applied to this component's view
   * @member {Array} styleUrls - The array of stylesheets URLs
   * @memberof AppComponent
   */
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * @description The title of the app
   * @member {string} title - The title of the app
   * @memberof AppComponent
   */
  title = 'filmify-client';
}
