//vuetest.js
var app = new Vue({
	el:'#animal',
	data:{
		explain:'This is a dog!!',
		pet:true,
		image:'./img/dog.jpg',
		inventry:3,
		infos:['犬','LAND（陸）','哺乳類'],
		count:0,
		inSwitch:'dog',
		banks:{
			dog:{
				name:'DOG',
				image:'./img/dog.jpg',
				live:'LAND'
			},
			cat:{
				name:'CAT',
				image:'./img/cat.jpg',
				live:'LANDED'
			},
			ham:{
				name:'HAMSTAR',
				image:'./img/ham.jpg',
				live:'LAN'
			}
		},
		changeCount:0,
		disabledParam:{
			false:false,
			true:true
		},
		parameter:true
	},
	methods:{
		counter(param){
			var para = this.count;
			para = (param=='plus') ? para + 1 : para - 1;
			if(para<=0) {
				if(para==0 && param=='non'){
					this.parameter = this.disabledParam.true;
					this.count = para;			
				}else{
					this.parameter = this.disabledParam.true;
				}
			} else {
				this.parameter = this.disabledParam.false;
				this.count = para;
			}

		},
		chaAni(){
			this.changeCount += 1;
			if(this.changeCount%3==0){
				this.inSwitch = 'dog';

			}else if(this.changeCount%3==1){
				this.inSwitch = 'cat';
			}else{
				this.inSwitch = 'ham';
			}
			this.image = this.banks[this.inSwitch].image;
			this.saveAnimalCount();
			this.saveAni();
		},
		saveAnimalCount() {
			//this.changeCount の値を保存
			const parsed = JSON.stringify(this.changeCount);
			localStorage.setItem('changeCount', parsed);
		},
		removeAnimalCount() {
			//this.changeCount の値を除去
			const parsed = JSON.stringify(this.changeCount);
			localStorage.removeItem('changeCount');
			this.changeCount = 0;
		},
		saveAni(){
			const parsed = JSON.stringify(this.inSwitch);
			localStorage.setItem('inSwitch', parsed);
			console.log(parsed);
			localStorage.setItem('image', this.banks[this.inSwitch].image);
		},
		removeAni() {
			//this.changeCount の値を除去
			const parsed = JSON.stringify(this.changeCount);
			localStorage.removeItem('inSwitch');
			localStorage.removeItem('image');
			this.inSwitch = 'dog';
			this.image = this.banks[this.inSwitch].image;
		}
	},
	mounted() {
		//json がぶっ壊れている可能性があるので、その場合は local storage を削除
		if(localStorage.getItem('image')) {
			try {
				this.image = JSON.parse(localStorage.getItem('image'));
			} catch(e) {
				//完了後の処理
			}
		}
		if(localStorage.getItem('inSwitch')) {
			try {
				this.inSwitch = JSON.parse(localStorage.getItem('inSwitch'));
			} catch(e) {
				//完了後の処理
			}
		}
		if (localStorage.getItem('changeCount')) {
			try {
				this.changeCount = JSON.parse(localStorage.getItem('changeCount'));

			} catch(e) {
				/*
				localStorage.removeItem('changeCount');
				localStorage.removeItem('inSwitch');
				localStorage.removeItem('image');
				*/
			}
		}
	}
})