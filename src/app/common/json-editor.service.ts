import { Injectable } from '@angular/core';
declare var ace: any;
@Injectable({
  providedIn: 'root'
})
export class JsonEditorService {

  constructor() { }
  editor: any;
  createEditor(elementId: string) {
    this.editor = ace.edit(elementId);
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/json");
  }
  setBeutefulValue(data: any) {
    this.editor.setValue(JSON.stringify(data, null, 2))
  }
  setValue(jsonString: string) {
    try {
      let data = JSON.parse(jsonString)
      this.setBeutefulValue(data);
    } catch (e) {
      this.editor.setValue("")
    }
  }
  getValue(): string {
    return this.editor.getValue();
  }
}
