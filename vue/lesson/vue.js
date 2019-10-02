var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

var app = new Vue({
		el:'#app',
		data:{
			todos: []
		},
		methods : {
			saveAs(parsed,target){
				localStorage.setItem(target, parsed);
			},
			jsonStr(str){
				 return JSON.stringify(str);
			},
			addTask: function(e, v) {
				var comment = this.$refs.comment;
				var date = this.$refs.date;

				if (!comment.value.length || !date.value.length ) {
					return
				}
				var count = this.todos.length;
				var result = date.value.replace(/-/g,'/');
				this.todos.push({
					id: count,
					date: result,
					comment: comment.value,
					state: 0
				});
				comment.value = '';
				date.value = '';

				this.saveAs(this.jsonStr(this.todos),'todos');
		    },
		    changeChecked(id){
		    	if( id===''|| id===null) return;
		    	this.todos[id].state = (!this.todos[id].state) ? 1 : 0;
		    	this.saveAs(this.jsonStr(this.todos),'todos');
		    },
		    removeTask(){
		    	localStorage.removeItem('todos');
		    	localStorage.removeItem('count');
		    },
		    removeList(id){
		    	this.todos.splice(id, 1);
		    	this.alignId();
		    	this.saveAs(this.jsonStr(this.todos),'todos');
		    },
		    dateSort(){
		    	this.todos.sort(function(a,b) {
				    return (a.date > b.date ? 1 : -1);
				});
				this.alignId();
				this.saveAs(this.jsonStr(this.todos),'todos');	
		    },
		    alignId(){
		    	for (var i = 0; i < this.todos.length; i++) {
		    		this.todos[i].id = i;
				}
		    }
		},
		mounted() {
			if(localStorage.getItem('count')) {
				try {
					this.count = JSON.parse(localStorage.getItem('count'));
				} catch(e) {
					//完了後の処理

				}
			}
			if(localStorage.getItem('todos')) {
				try {
					this.todos = JSON.parse(localStorage.getItem('todos'));
				} catch(e) {
					//完了後の処理
					this.saveAs(this.jsonStr(this.todos),'todos');
				}
			}
		}
	})