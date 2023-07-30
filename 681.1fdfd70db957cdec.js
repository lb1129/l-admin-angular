"use strict";(self.webpackChunkl_admin_angular=self.webpackChunkl_admin_angular||[]).push([[681],{7681:(S,u,r)=>{r.r(u),r.d(u,{default:()=>J});var c=r(8145),p=r(6814),i=r(6223),E=r(4664),z=r(2096),_=r(3599),m=r(824),g=r(2840),f=r(2078),T=r(7776),e=r(5879),v=r(9515),C=r(7705),A=r(2333),L=r(2064),h=r(95),O=r(855),P=r(1958);function x(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.ALo(2,"async"),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(e.lcZ(2,1,t.translate.get("passwordRule")))}}function D(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.ALo(2,"async"),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(e.lcZ(2,1,t.translate.get("pleaseEnterPassword")))}}function M(n,a){if(1&n&&(e.YNc(0,x,3,3,"ng-container",14),e.YNc(1,D,3,3,"ng-container",14)),2&n){const t=a.$implicit;e.Q6J("ngIf",t.hasError("password")),e.xp6(1),e.Q6J("ngIf",t.hasError("required"))}}function Z(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.ALo(2,"async"),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(e.lcZ(2,1,t.translate.get("twoPasswordsDoNotMatch")))}}function y(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.ALo(2,"async"),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(e.lcZ(2,1,t.translate.get("pleaseEnterPassword")))}}function R(n,a){if(1&n&&(e.YNc(0,Z,3,3,"ng-container",14),e.YNc(1,y,3,3,"ng-container",14)),2&n){const t=a.$implicit;e.Q6J("ngIf",t.hasError("confirmPassword")),e.xp6(1),e.Q6J("ngIf",t.hasError("required"))}}function U(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.ALo(2,"async"),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(e.lcZ(2,1,t.translate.get("phoneRule")))}}function I(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.ALo(2,"async"),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(e.lcZ(2,1,t.translate.get("pleaseEnterMobileNumber")))}}function Q(n,a){if(1&n&&(e.YNc(0,U,3,3,"ng-container",14),e.YNc(1,I,3,3,"ng-container",14)),2&n){const t=a.$implicit;e.Q6J("ngIf",t.hasError("phone")),e.xp6(1),e.Q6J("ngIf",t.hasError("required"))}}function B(n,a){if(1&n&&(e.TgZ(0,"div"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Oqu(t.phoneCode)}}let J=(()=>{class n{constructor(t,o,s,l,d,w,N){this.router=t,this.fb=o,this.notification=s,this.translate=l,this.validate=d,this.authService=w,this.otherService=N,this.submitLoading=!1,this.codeLoading=!1,this.codeTime=0,this.phoneCode="",this.form=this.fb.group({username:["",i.kI.required],password:["",[i.kI.required,this.passwordValidator.bind(this)]],confirmPassword:["",[i.kI.required,this.confirmPasswordValidator.bind(this)]],phone:["",[i.kI.required,this.phoneValidator.bind(this)]],code:["",i.kI.required]})}ngOnDestroy(){clearInterval(this.timer)}passwordValidator(t){return t.value&&!this.validate.isPassword(t.value)?{password:!0,error:!0}:{}}confirmPasswordValidator(t){return t.value&&t.value!==this.form.controls.password.value?{confirmPassword:!0,error:!0}:{}}phoneValidator(t){return t.value&&!this.validate.isPhone(t.value)?{phone:!0,error:!0}:{}}getCodeText(){return this.translate.get(["retrieve","getVerificationCode"]).pipe((0,E.w)(t=>(0,z.of)(this.codeTime>0?`${t.retrieve}${this.codeTime}s`:t.getVerificationCode)))}getCodeHandler(t){t.preventDefault();const o=this.form.controls.phone;o.markAsDirty(),o.updateValueAndValidity({onlySelf:!0}),o.valid&&(this.codeLoading=!0,this.otherService.sendCode(Number(o.value)).subscribe({next:s=>{this.phoneCode=s.data,this.codeTime=60,this.timer=window.setInterval(()=>{this.codeTime<=0?(this.phoneCode="",clearInterval(this.timer)):this.codeTime--},1e3),this.codeLoading=!1},error:()=>{this.codeLoading=!1}}))}submitHandler(){if(this.form.valid){const t=this.form.value;this.submitLoading=!0,this.authService.register({username:t.username,password:t.password,phone:Number(t.phone),code:t.code}).subscribe({next:()=>{this.translate.get(["tip","registerSuccess"]).subscribe(o=>{this.notification.success(o.tip,o.registerSuccess,{nzDuration:2e3}),setTimeout(()=>{this.router.navigate(["login"])},2e3),this.submitLoading=!1})},error:()=>{this.submitLoading=!1}})}else Object.values(this.form.controls).forEach(t=>{t.invalid&&(t.markAsDirty(),t.updateValueAndValidity({onlySelf:!0}))})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(c.F0),e.Y36(i.QS),e.Y36(f.zb),e.Y36(v.sK),e.Y36(C.Q),e.Y36(A.e),e.Y36(L.m))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-register"]],standalone:!0,features:[e.jDz],decls:42,vars:39,consts:[["nz-form","",3,"formGroup","ngSubmit"],[3,"nzErrorTip"],["nz-input","","nzSize","large","formControlName","username",3,"placeholder"],["type","password","nz-input","","nzSize","large","formControlName","password",3,"placeholder"],["passwordErrorTpl",""],["type","password","nz-input","","nzSize","large","formControlName","confirmPassword",3,"placeholder"],["confirmPasswordErrorTpl",""],["nz-input","","nzSize","large","formControlName","phone",3,"placeholder"],["phoneErrorTpl",""],[3,"nzGutter"],["nzSpan","16",3,"nzErrorTip"],["nz-input","","nzSize","large","formControlName","code",3,"placeholder"],["nzSpan","8"],["nz-button","","nzBlock","","nzSize","large",3,"nzLoading","disabled","click"],[4,"ngIf"],[2,"display","block"],["routerLink","/login"],["nz-button","","nzType","primary","nzBlock","","nzSize","large",3,"nzLoading"]],template:function(t,o){if(1&t&&(e.TgZ(0,"app-layout")(1,"form",0),e.NdJ("ngSubmit",function(){return o.submitHandler()}),e.TgZ(2,"nz-form-item")(3,"nz-form-control",1),e.ALo(4,"async"),e._UZ(5,"input",2),e.ALo(6,"async"),e.qZA()(),e.TgZ(7,"nz-form-item")(8,"nz-form-control",1),e._UZ(9,"input",3),e.ALo(10,"async"),e.YNc(11,M,2,2,"ng-template",null,4,e.W1O),e.qZA()(),e.TgZ(13,"nz-form-item")(14,"nz-form-control",1),e._UZ(15,"input",5),e.ALo(16,"async"),e.YNc(17,R,2,2,"ng-template",null,6,e.W1O),e.qZA()(),e.TgZ(19,"nz-form-item")(20,"nz-form-control",1),e._UZ(21,"input",7),e.ALo(22,"async"),e.YNc(23,Q,2,2,"ng-template",null,8,e.W1O),e.qZA()(),e.TgZ(25,"nz-form-item",9)(26,"nz-form-control",10),e.ALo(27,"async"),e._UZ(28,"input",11),e.ALo(29,"async"),e.qZA(),e.TgZ(30,"nz-col",12)(31,"button",13),e.NdJ("click",function(l){return o.getCodeHandler(l)}),e._uU(32),e.ALo(33,"async"),e.qZA()()(),e.YNc(34,B,2,1,"div",14),e.TgZ(35,"nz-form-item",15)(36,"a",16),e._uU(37),e.ALo(38,"async"),e.qZA()(),e.TgZ(39,"button",17),e._uU(40),e.ALo(41,"async"),e.qZA()()()),2&t){const s=e.MAs(12),l=e.MAs(18),d=e.MAs(24);e.xp6(1),e.Q6J("formGroup",o.form),e.xp6(2),e.Q6J("nzErrorTip",e.lcZ(4,19,o.translate.get("pleaseEnterAccount"))),e.xp6(2),e.Q6J("placeholder",e.lcZ(6,21,o.translate.get("account"))),e.xp6(3),e.Q6J("nzErrorTip",s),e.xp6(1),e.Q6J("placeholder",e.lcZ(10,23,o.translate.get("password"))),e.xp6(5),e.Q6J("nzErrorTip",l),e.xp6(1),e.Q6J("placeholder",e.lcZ(16,25,o.translate.get("confirmPassword"))),e.xp6(5),e.Q6J("nzErrorTip",d),e.xp6(1),e.Q6J("placeholder",e.lcZ(22,27,o.translate.get("mobileNumber"))),e.xp6(4),e.Q6J("nzGutter",16),e.xp6(1),e.Q6J("nzErrorTip",e.lcZ(27,29,o.translate.get("pleaseEnterVerificationCode"))),e.xp6(2),e.Q6J("placeholder",e.lcZ(29,31,o.translate.get("verificationCode"))),e.xp6(3),e.Q6J("nzLoading",o.codeLoading)("disabled",o.codeTime>0),e.xp6(1),e.hij(" ",e.lcZ(33,33,o.getCodeText())," "),e.xp6(2),e.Q6J("ngIf",o.phoneCode),e.xp6(3),e.Oqu(e.lcZ(38,35,o.translate.get("haveAnAccount"))),e.xp6(2),e.Q6J("nzLoading",o.submitLoading),e.xp6(1),e.hij(" ",e.lcZ(41,37,o.translate.get("register"))," ")}},dependencies:[c.Bz,c.rH,p.ez,p.O5,p.Ov,i.UX,i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,_.U5,h.t3,h.SK,_.Lr,_.Nx,_.Fd,m.o7,m.Zp,g.sL,g.ix,O.w,P.dQ,f.L8,T.default]}),n})()}}]);