import { Component, OnInit, ElementRef, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit {
  @ViewChild("tpl", { read: ElementRef }) tpl: ElementRef;


  constructor(private hostElement: ElementRef) {
  }

  ngAfterViewInit() {

    console.log(this.tpl.nativeElement);

    $(function () {

      $('.grid-stack').gridstack({});

      let serializedData = [{
        x: 0,
        y: 0,
        width: 2,
        height: 2
      },
      {
        x: 2,
        y: 0,
        width: 4,
        height: 2
      }
      ];
      let template =
        `<div><div class="grid-stack-item-content"></div></div>`
      let grid = $('.grid-stack').data('gridstack')
      serializedData.forEach(function (node) {
        grid.addWidget($(
          template),
          node.x, node.y, node.width, node.height);
      });
    })
  }

}
