import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component that defines the movie description component of the app
 * @category Components
 * @class
 * @module
 */
@Component({
  /**
   * @description CSS selector that identifies the component
   * @member {string} selector - CSS selector for the component
   * @memberof GenreComponent
   */
  selector: 'app-genre',
  /**
   * @description URL component's HTML template
   * @member {string} templateUrl - The template URL for the component
   * @memberof GenreComponent
   */
  templateUrl: './genre.component.html',
  /**
   * @description Array of URLs of stylesheets to use in this component
   * @member {Array} styleUrls - Name for stylesheets for the component
   * @memberof GenreComponent
   */
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent {
  /**
   * @description Inject data passed to the dialog into the copmponent
   * @constructor
   * @param {MAT_DIALOG_DATA} data - The data injected into the component
   * @memberof GenreComponent
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
