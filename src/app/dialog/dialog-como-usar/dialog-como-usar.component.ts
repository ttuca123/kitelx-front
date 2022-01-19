import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {faThumbsDown} from '@fortawesome/free-regular-svg-icons';
import { faHeading, faMoneyCheck, faAlignJustify, faImage, faHandHoldingUsd, faShareAlt,
         faCopy, faListUl, faExclamation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog-como-usar',
  templateUrl: './dialog-como-usar.component.html',
  styleUrls: ['./dialog-como-usar.component.scss']
})
export class DialogComoUsarComponent implements OnInit {

  iconeThumbsDown = faThumbsDown;
  iconeHending = faHeading;
  iconeMoney = faMoneyCheck;
  iconeAlign = faAlignJustify;
  iconeImage = faImage;
  iconeHandHolding = faHandHoldingUsd;
  iconeSareAlt = faShareAlt;
  iconeCopy = faCopy;
  iconeListUl = faListUl;
  iconeExclametion = faExclamation;
  constructor(
  public dialogRef: MatDialogRef<DialogComoUsarComponent>) { }

  ngOnInit(): void {

  }

  closeModal() {

    this.dialogRef.close();
  }
}
