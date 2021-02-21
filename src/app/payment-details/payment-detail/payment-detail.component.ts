import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  constructor(public service:PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      PMId : 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    }
  }

  onSubmit(form:NgForm) {
    if (this.service.formData.PMId == 0) { 
      this.insert(form); 
    } else { 
      this.update(form);
    }
  }

  update(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Updated successfully!','Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  insert(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully!','Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
}
