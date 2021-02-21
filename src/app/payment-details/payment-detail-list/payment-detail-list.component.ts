import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(pd:PaymentDetail) {
    this.service.formData = Object.assign({}, pd);
  }

  delete(PMId) {

    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePaymentDetail(PMId)
      .subscribe(
        res => {
          this.toastr.warning('Deleted successfully!','Payment Detail Register');
          this.service.refreshList();
        },
        err => {
          console.log(err);
        });
    }
  }

}
