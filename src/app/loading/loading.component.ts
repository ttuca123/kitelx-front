import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { View } from '../view';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent  implements OnInit {

  message= '';

  constructor( public dialogRef: MatDialogRef<LoadingComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { 

      
    }

  ngOnInit(): void {

    this.message = this.data!=null?this.data.message:'';

  }

}
