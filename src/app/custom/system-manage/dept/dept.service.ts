import { Injectable } from '@angular/core';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DeptService {

  constructor(private api: ApiService) { }

  getList(condition: any = {}) {
    return this.api.get("/system/dept/list", condition).pipe(
      map(res => {
        let treeData: TreeNode[] = new Array();
        let hash = {};
        res = res.sort((a, b) => a.parentId - b.parentId);
        console.log(res)
        res.forEach(
          dept => {
            try {
              if (dept.parentId === 100) {
                // 最外层
                let node: TreeNode = {
                  label: dept.deptName,
                  data: dept,
                  children: []
                };
                treeData.push(node);
                hash[dept.deptId] = treeData.length - 1
              } else {
                let node: TreeNode = {
                  label: dept.title,
                  data: dept,
                }
                treeData[hash[dept.parentId]].children.push(node);
              }
            } catch (e) {
              return
            }
          }
        )
        console.log("treeData", treeData);
        return treeData;
      })
    );
  }


  save(dept: any) {
    let reqUrl = ""
    if (dept.deptId === undefined) {
      reqUrl = "/system/dept/add"
    } else {
      reqUrl = "/system/dept/edit"
    }
    dept = this.api.transToFormData(dept);
    return this.api.post(reqUrl, dept);
  }

  del(ids: number) {
    let data = this.api.transToFormData({ ids: ids });
    return this.api.post("/system/dept/remove", data)
  }
}
