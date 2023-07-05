"use strict";(self.webpackChunkl_admin_angular=self.webpackChunkl_admin_angular||[]).push([[418],{8418:(lt,v,o)=>{o.r(v),o.d(v,{default:()=>pt});var z=o(6814),p=o(6223),x=o(6254),G=o(8125),y=o(4139),_=o(2840),F=o(824),N=o(7582),h=o(6028),e=o(5879),D=o(8645),c=o(2438),k=o(3019),Z=o(3997),m=o(9773),A=o(9087),d=o(7754),E=o(4300),O=o(9388),C=o(883),T=o(2595),R=o(8324);const B=["upHandler"],w=["downHandler"],V=["inputElement"];function J(i,s){if(1&i&&e._UZ(0,"nz-form-item-feedback-icon",11),2&i){const t=e.oxw();e.Q6J("status",t.status)}}let et=(()=>{class i{onModelChange(t){this.parsedValue=this.nzParser(t),this.inputElement.nativeElement.value=`${this.parsedValue}`;const n=this.getCurrentValidValue(this.parsedValue);this.setValue(n)}getCurrentValidValue(t){let n=t;return n=""===n?"":this.isNotCompleteNumber(n)?this.value:`${this.getValidValue(n)}`,this.toNumber(n)}isNotCompleteNumber(t){return isNaN(t)||""===t||null===t||!(!t||t.toString().indexOf(".")!==t.toString().length-1)}getValidValue(t){let n=parseFloat(t);return isNaN(n)?t:(n<this.nzMin&&(n=this.nzMin),n>this.nzMax&&(n=this.nzMax),n)}toNumber(t){if(this.isNotCompleteNumber(t))return t;const n=String(t);if(n.indexOf(".")>=0&&(0,d.DX)(this.nzPrecision)){if("function"==typeof this.nzPrecisionMode)return this.nzPrecisionMode(t,this.nzPrecision);if("cut"===this.nzPrecisionMode){const r=n.split(".");return r[1]=r[1].slice(0,this.nzPrecision),Number(r.join("."))}return Number(Number(t).toFixed(this.nzPrecision))}return Number(t)}getRatio(t){let n=1;return t.metaKey||t.ctrlKey?n=.1:t.shiftKey&&(n=10),n}down(t,n){this.isFocused||this.focus(),this.step("down",t,n)}up(t,n){this.isFocused||this.focus(),this.step("up",t,n)}getPrecision(t){const n=t.toString();if(n.indexOf("e-")>=0)return parseInt(n.slice(n.indexOf("e-")+2),10);let r=0;return n.indexOf(".")>=0&&(r=n.length-n.indexOf(".")-1),r}getMaxPrecision(t,n){if((0,d.DX)(this.nzPrecision))return this.nzPrecision;const r=this.getPrecision(n),u=this.getPrecision(this.nzStep),a=this.getPrecision(t);return t?Math.max(a,r+u):r+u}getPrecisionFactor(t,n){const r=this.getMaxPrecision(t,n);return Math.pow(10,r)}upStep(t,n){const r=this.getPrecisionFactor(t,n),u=Math.abs(this.getMaxPrecision(t,n));let a;return a="number"==typeof t?((r*t+r*this.nzStep*n)/r).toFixed(u):this.nzMin===-1/0?this.nzStep:this.nzMin,this.toNumber(a)}downStep(t,n){const r=this.getPrecisionFactor(t,n),u=Math.abs(this.getMaxPrecision(t,n));let a;return a="number"==typeof t?((r*t-r*this.nzStep*n)/r).toFixed(u):this.nzMin===-1/0?-this.nzStep:this.nzMin,this.toNumber(a)}step(t,n,r=1){if(this.stop(),n.preventDefault(),this.nzDisabled)return;const u=this.getCurrentValidValue(this.parsedValue)||0;let a=0;"up"===t?a=this.upStep(u,r):"down"===t&&(a=this.downStep(u,r));const l=a>this.nzMax||a<this.nzMin;a>this.nzMax?a=this.nzMax:a<this.nzMin&&(a=this.nzMin),this.setValue(a),this.updateDisplayValue(a),this.isFocused=!0,!l&&(this.autoStepTimer=setTimeout(()=>{this[t](n,r)},300))}stop(){this.autoStepTimer&&clearTimeout(this.autoStepTimer)}setValue(t){if(`${this.value}`!=`${t}`&&this.onChange(t),this.value=t,this.parsedValue=t,this.disabledUp=this.disabledDown=!1,t||0===t){const n=Number(t);n>=this.nzMax&&(this.disabledUp=!0),n<=this.nzMin&&(this.disabledDown=!0)}}updateDisplayValue(t){const n=(0,d.DX)(this.nzFormatter(t))?this.nzFormatter(t):"";this.displayValue=n,this.inputElement.nativeElement.value=`${n}`}writeValue(t){this.value=t,this.setValue(t),this.updateDisplayValue(t),this.cdr.markForCheck()}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this.nzDisabled=this.isNzDisableFirstChange&&this.nzDisabled||t,this.isNzDisableFirstChange=!1,this.disabled$.next(this.nzDisabled),this.cdr.markForCheck()}focus(){this.focusMonitor.focusVia(this.inputElement,"keyboard")}blur(){this.inputElement.nativeElement.blur()}constructor(t,n,r,u,a,l,b,I,S){this.ngZone=t,this.elementRef=n,this.cdr=r,this.focusMonitor=u,this.renderer=a,this.directionality=l,this.destroy$=b,this.nzFormStatusService=I,this.nzFormNoStatusService=S,this.isNzDisableFirstChange=!0,this.isFocused=!1,this.disabled$=new D.x,this.disabledUp=!1,this.disabledDown=!1,this.dir="ltr",this.prefixCls="ant-input-number",this.status="",this.statusCls={},this.hasFeedback=!1,this.onChange=()=>{},this.onTouched=()=>{},this.nzBlur=new e.vpe,this.nzFocus=new e.vpe,this.nzSize="default",this.nzMin=-1/0,this.nzMax=1/0,this.nzParser=f=>f.trim().replace(/\u3002/g,".").replace(/[^\w\.-]+/g,""),this.nzPrecisionMode="toFixed",this.nzPlaceHolder="",this.nzStatus="",this.nzStep=1,this.nzInputMode="decimal",this.nzId=null,this.nzDisabled=!1,this.nzReadOnly=!1,this.nzAutoFocus=!1,this.nzBorderless=!1,this.nzFormatter=f=>f}ngOnInit(){this.nzFormStatusService?.formStatusChanges.pipe((0,Z.x)((t,n)=>t.status===n.status&&t.hasFeedback===n.hasFeedback),(0,m.R)(this.destroy$)).subscribe(({status:t,hasFeedback:n})=>{this.setStatusStyles(t,n)}),this.focusMonitor.monitor(this.elementRef,!0).pipe((0,m.R)(this.destroy$)).subscribe(t=>{t?(this.isFocused=!0,this.nzFocus.emit()):(this.isFocused=!1,this.updateDisplayValue(this.value),this.nzBlur.emit(),Promise.resolve().then(()=>this.onTouched()))}),this.dir=this.directionality.value,this.directionality.change.pipe((0,m.R)(this.destroy$)).subscribe(t=>{this.dir=t}),this.setupHandlersListeners(),this.ngZone.runOutsideAngular(()=>{(0,c.R)(this.inputElement.nativeElement,"keyup").pipe((0,m.R)(this.destroy$)).subscribe(()=>this.stop()),(0,c.R)(this.inputElement.nativeElement,"keydown").pipe((0,m.R)(this.destroy$)).subscribe(t=>{const{keyCode:n}=t;n!==h.LH&&n!==h.JH&&n!==h.K5||this.ngZone.run(()=>{if(n===h.LH){const r=this.getRatio(t);this.up(t,r),this.stop()}else if(n===h.JH){const r=this.getRatio(t);this.down(t,r),this.stop()}else this.updateDisplayValue(this.value);this.cdr.markForCheck()})})})}ngOnChanges(t){const{nzStatus:n,nzDisabled:r}=t;if(t.nzFormatter&&!t.nzFormatter.isFirstChange()){const u=this.getCurrentValidValue(this.parsedValue);this.setValue(u),this.updateDisplayValue(u)}r&&this.disabled$.next(this.nzDisabled),n&&this.setStatusStyles(this.nzStatus,this.hasFeedback)}ngAfterViewInit(){this.nzAutoFocus&&this.focus()}ngOnDestroy(){this.focusMonitor.stopMonitoring(this.elementRef)}setupHandlersListeners(){this.ngZone.runOutsideAngular(()=>{(0,k.T)((0,c.R)(this.upHandler.nativeElement,"mouseup"),(0,c.R)(this.upHandler.nativeElement,"mouseleave"),(0,c.R)(this.downHandler.nativeElement,"mouseup"),(0,c.R)(this.downHandler.nativeElement,"mouseleave")).pipe((0,m.R)(this.destroy$)).subscribe(()=>this.stop())})}setStatusStyles(t,n){this.status=t,this.hasFeedback=n,this.cdr.markForCheck(),this.statusCls=(0,d.Zu)(this.prefixCls,t,n),Object.keys(this.statusCls).forEach(r=>{this.statusCls[r]?this.renderer.addClass(this.elementRef.nativeElement,r):this.renderer.removeClass(this.elementRef.nativeElement,r)})}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(e.R0b),e.Y36(e.SBq),e.Y36(e.sBO),e.Y36(E.tE),e.Y36(e.Qsj),e.Y36(O.Is,8),e.Y36(A.kn),e.Y36(C.kH,8),e.Y36(C.yW,8))},i.\u0275cmp=e.Xpm({type:i,selectors:[["nz-input-number"]],viewQuery:function(t,n){if(1&t&&(e.Gf(B,7),e.Gf(w,7),e.Gf(V,7)),2&t){let r;e.iGM(r=e.CRH())&&(n.upHandler=r.first),e.iGM(r=e.CRH())&&(n.downHandler=r.first),e.iGM(r=e.CRH())&&(n.inputElement=r.first)}},hostAttrs:[1,"ant-input-number"],hostVars:16,hostBindings:function(t,n){2&t&&e.ekj("ant-input-number-in-form-item",!!n.nzFormStatusService)("ant-input-number-focused",n.isFocused)("ant-input-number-lg","large"===n.nzSize)("ant-input-number-sm","small"===n.nzSize)("ant-input-number-disabled",n.nzDisabled)("ant-input-number-readonly",n.nzReadOnly)("ant-input-number-rtl","rtl"===n.dir)("ant-input-number-borderless",n.nzBorderless)},inputs:{nzSize:"nzSize",nzMin:"nzMin",nzMax:"nzMax",nzParser:"nzParser",nzPrecision:"nzPrecision",nzPrecisionMode:"nzPrecisionMode",nzPlaceHolder:"nzPlaceHolder",nzStatus:"nzStatus",nzStep:"nzStep",nzInputMode:"nzInputMode",nzId:"nzId",nzDisabled:"nzDisabled",nzReadOnly:"nzReadOnly",nzAutoFocus:"nzAutoFocus",nzBorderless:"nzBorderless",nzFormatter:"nzFormatter"},outputs:{nzBlur:"nzBlur",nzFocus:"nzFocus"},exportAs:["nzInputNumber"],features:[e._Bn([{provide:p.JU,useExisting:(0,e.Gpc)(()=>i),multi:!0},A.kn]),e.TTD],decls:11,vars:15,consts:[[1,"ant-input-number-handler-wrap"],["unselectable","unselectable",1,"ant-input-number-handler","ant-input-number-handler-up",3,"mousedown"],["upHandler",""],["nz-icon","","nzType","up",1,"ant-input-number-handler-up-inner"],["unselectable","unselectable",1,"ant-input-number-handler","ant-input-number-handler-down",3,"mousedown"],["downHandler",""],["nz-icon","","nzType","down",1,"ant-input-number-handler-down-inner"],[1,"ant-input-number-input-wrap"],["autocomplete","off",1,"ant-input-number-input",3,"disabled","placeholder","readOnly","ngModel","ngModelChange"],["inputElement",""],["class","ant-input-number-suffix",3,"status",4,"ngIf"],[1,"ant-input-number-suffix",3,"status"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"span",1,2),e.NdJ("mousedown",function(u){return n.up(u)}),e._UZ(3,"span",3),e.qZA(),e.TgZ(4,"span",4,5),e.NdJ("mousedown",function(u){return n.down(u)}),e._UZ(6,"span",6),e.qZA()(),e.TgZ(7,"div",7)(8,"input",8,9),e.NdJ("ngModelChange",function(u){return n.onModelChange(u)}),e.qZA()(),e.YNc(10,J,1,1,"nz-form-item-feedback-icon",10)),2&t&&(e.xp6(1),e.ekj("ant-input-number-handler-up-disabled",n.disabledUp),e.xp6(3),e.ekj("ant-input-number-handler-down-disabled",n.disabledDown),e.xp6(4),e.Q6J("disabled",n.nzDisabled)("placeholder",n.nzPlaceHolder)("readOnly",n.nzReadOnly)("ngModel",n.displayValue),e.uIk("id",n.nzId)("autofocus",n.nzAutoFocus?"autofocus":null)("min",n.nzMin)("max",n.nzMax)("step",n.nzStep)("inputmode",n.nzInputMode),e.xp6(2),e.Q6J("ngIf",n.hasFeedback&&!!n.status&&!n.nzFormNoStatusService))},dependencies:[z.O5,p.Fj,p.JJ,p.On,T.Ls,C.w_],encapsulation:2,changeDetection:0}),(0,N.gn)([(0,d.yF)()],i.prototype,"nzDisabled",void 0),(0,N.gn)([(0,d.yF)()],i.prototype,"nzReadOnly",void 0),(0,N.gn)([(0,d.yF)()],i.prototype,"nzAutoFocus",void 0),(0,N.gn)([(0,d.yF)()],i.prototype,"nzBorderless",void 0),i})(),nt=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[O.vT,z.ez,p.u5,R.T,T.PV,C.mJ]}),i})();var g=o(3599),M=o(2612),it=o(1567),rt=o(4613),st=o(3460),ot=o(9515),at=o(855),ut=o(1958),P=o(95);let pt=(()=>{class i{constructor(t,n,r,u,a,l){this.location=t,this.fb=n,this.route=r,this.productService=u,this.message=a,this.translate=l,this.loading=!1,this.id="",this.submitLoading=!1}ngOnInit(){this.form=this.fb.group({name:["",p.kI.required],brand:["",p.kI.required],category:["",p.kI.required],price:[0,p.kI.required],color:["",p.kI.required],inventory:[0,p.kI.required],style:["",p.kI.required],enable:[!0],describe:[""]}),this.id=this.route.snapshot.paramMap.get("id")??"",this.id&&(this.loading=!0,this.productService.getProductById(this.id).subscribe({next:t=>{const{name:n,brand:r,category:u,price:a,color:l,inventory:b,style:I,enable:S,describe:f}=t.data;this.form.setValue({name:n,brand:r,category:u,price:a,color:l,inventory:b,style:I,enable:S,describe:f}),this.loading=!1},error:()=>{this.loading=!1}}))}backHandler(){this.location.back()}saveHandler(){if(this.form.valid){const t=this.form.value;this.submitLoading=!0,this.id&&(t.id=this.id),this.productService.saveProduct(t).subscribe({next:()=>{this.translate.get("save").subscribe(n=>{this.translate.get("whatSuccess",{value:n}).subscribe(r=>{this.submitLoading=!1,this.message.success(r),this.location.back()})})},error:()=>{this.submitLoading=!1}})}else Object.values(this.form.controls).forEach(t=>{t.invalid&&(t.markAsDirty(),t.updateValueAndValidity({onlySelf:!0}))})}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(z.Ye),e.Y36(p.QS),e.Y36(it.gz),e.Y36(rt.M),e.Y36(st.dD),e.Y36(ot.sK))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-product-add-or-edit"]],standalone:!0,features:[e.jDz],decls:64,vars:23,consts:[["nzBackIcon","",3,"nzTitle","nzBack"],["nz-button","","nzType","primary",3,"nzLoading","click"],[3,"nzLoading"],["nz-form","",3,"formGroup"],["nz-row","",3,"nzGutter"],["nz-col","",3,"nzSpan"],["nzRequired","","nzFor","name"],["nzErrorTip","\u8bf7\u8f93\u5165\u540d\u79f0"],["nz-input","","formControlName","name","id","name"],["nzRequired","","nzFor","brand"],["nzErrorTip","\u8bf7\u8f93\u5165\u54c1\u724c"],["nz-input","","formControlName","brand","id","brand"],["nzRequired","","nzFor","category"],["nzErrorTip","\u8bf7\u8f93\u5165\u7c7b\u522b"],["nz-input","","formControlName","category","id","category"],["nzRequired","","nzFor","price"],["nzErrorTip","\u8bf7\u8f93\u5165\u4ef7\u683c"],["formControlName","price","nzId","price",2,"width","100%",3,"nzMin","nzPrecision"],["nzRequired","","nzFor","color"],["nzErrorTip","\u8bf7\u8f93\u5165\u989c\u8272"],["nz-input","","formControlName","color","id","color"],["nzRequired","","nzFor","inventory"],["nzErrorTip","\u8bf7\u8f93\u5165\u5e93\u5b58"],["formControlName","inventory","nzId","inventory",2,"width","100%",3,"nzMin","nzPrecision"],["nzRequired","","nzFor","style"],["nzErrorTip","\u8bf7\u8f93\u5165\u6b3e\u5f0f"],["nz-input","","formControlName","style","id","style"],["nzFor","enable"],["nz-checkbox","","formControlName","enable","nzId","enable"],["nzFor","describe"],["formControlName","describe","nz-input","","id","describe"]],template:function(t,n){1&t&&(e.TgZ(0,"nz-page-header",0),e.NdJ("nzBack",function(){return n.backHandler()}),e.ALo(1,"async"),e.TgZ(2,"nz-page-header-extra")(3,"button",1),e.NdJ("click",function(){return n.saveHandler()}),e._uU(4),e.ALo(5,"async"),e.qZA()(),e.TgZ(6,"nz-page-header-content")(7,"nz-skeleton",2)(8,"form",3)(9,"div",4)(10,"div",5)(11,"nz-form-item")(12,"nz-form-label",6),e._uU(13,"\u540d\u79f0"),e.qZA(),e.TgZ(14,"nz-form-control",7),e._UZ(15,"input",8),e.qZA()()(),e.TgZ(16,"div",5)(17,"nz-form-item")(18,"nz-form-label",9),e._uU(19,"\u54c1\u724c"),e.qZA(),e.TgZ(20,"nz-form-control",10),e._UZ(21,"input",11),e.qZA()()(),e.TgZ(22,"div",5)(23,"nz-form-item")(24,"nz-form-label",12),e._uU(25,"\u7c7b\u522b"),e.qZA(),e.TgZ(26,"nz-form-control",13),e._UZ(27,"input",14),e.qZA()()(),e.TgZ(28,"div",5)(29,"nz-form-item")(30,"nz-form-label",15),e._uU(31,"\u4ef7\u683c"),e.qZA(),e.TgZ(32,"nz-form-control",16),e._UZ(33,"nz-input-number",17),e.qZA()()(),e.TgZ(34,"div",5)(35,"nz-form-item")(36,"nz-form-label",18),e._uU(37,"\u989c\u8272"),e.qZA(),e.TgZ(38,"nz-form-control",19),e._UZ(39,"input",20),e.qZA()()(),e.TgZ(40,"div",5)(41,"nz-form-item")(42,"nz-form-label",21),e._uU(43,"\u5e93\u5b58"),e.qZA(),e.TgZ(44,"nz-form-control",22),e._UZ(45,"nz-input-number",23),e.qZA()()(),e.TgZ(46,"div",5)(47,"nz-form-item")(48,"nz-form-label",24),e._uU(49,"\u6b3e\u5f0f"),e.qZA(),e.TgZ(50,"nz-form-control",25),e._UZ(51,"input",26),e.qZA()()(),e.TgZ(52,"div",5)(53,"nz-form-item")(54,"nz-form-label",27),e._uU(55,"\u662f\u5426\u542f\u7528"),e.qZA(),e.TgZ(56,"nz-form-control"),e._UZ(57,"span",28),e.qZA()()(),e.TgZ(58,"div",5)(59,"nz-form-item")(60,"nz-form-label",29),e._uU(61,"\u63cf\u8ff0"),e.qZA(),e.TgZ(62,"nz-form-control"),e._UZ(63,"textarea",30),e.qZA()()()()()()()()),2&t&&(e.Q6J("nzTitle",e.lcZ(1,19,n.translate.get(n.id?"edit":"detail"))),e.xp6(3),e.Q6J("nzLoading",n.submitLoading),e.xp6(1),e.hij(" ",e.lcZ(5,21,n.translate.get("save"))," "),e.xp6(3),e.Q6J("nzLoading",n.loading),e.xp6(1),e.Q6J("formGroup",n.form),e.xp6(1),e.Q6J("nzGutter",24),e.xp6(1),e.Q6J("nzSpan",8),e.xp6(6),e.Q6J("nzSpan",8),e.xp6(6),e.Q6J("nzSpan",8),e.xp6(6),e.Q6J("nzSpan",8),e.xp6(5),e.Q6J("nzMin",0)("nzPrecision",2),e.xp6(1),e.Q6J("nzSpan",8),e.xp6(6),e.Q6J("nzSpan",8),e.xp6(5),e.Q6J("nzMin",0)("nzPrecision",0),e.xp6(1),e.Q6J("nzSpan",8),e.xp6(6),e.Q6J("nzSpan",16),e.xp6(6),e.Q6J("nzSpan",24))},dependencies:[z.ez,z.Ov,p.UX,p._Y,p.Fj,p.JJ,p.JL,p.sg,p.u,x.KJ,x.$O,x.u5,x.Jp,G.q6,y.H0,y.ng,_.sL,_.ix,at.w,ut.dQ,F.o7,F.Zp,nt,et,g.U5,P.t3,P.SK,g.Lr,g.Nx,g.iK,g.Fd,M.Wr,M.Ie]}),i})()}}]);