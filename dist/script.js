const TODO_STORAGE_KEY = "todostorage";

let todoStorage = {
  fetch: () => JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || "[]"),
  save: todos => localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
};

const app = new Vue({
  el: "#app",
  data: () => {
    return {
      todos: todoStorage.fetch(),
      newItem: "",
      dragging: -1
    };
  },
  methods: {
    addNItems() {
      var n = this.newItem;
      for (i = 0; i < n; i++) {
        //alert('');
        this.todos.push({
          id: i + 1,
          title: "Name " + (i + 1),
          done: false
        });
        //this.todos[i].$child.value = "S";
        this.newItem = "";
      }
    },
    addItem() {
      if (!this.newItem) {
        return;
      }
      this.todos.push({
        title: this.newItem,
        done: false
      });
      this.newItem = "";
    },
    removeItem(item) {
      this.todos.splice(this.todos.indexOf(item), 1);
    },
    updateTitle(item, val) {
      item.title = val;
      console.log(val);
    },
    saveItems() {
      console.log(this.todos);
    },
    reset() {
      while (this.todos.length) {
        this.todos.pop();
      }
    },
    dragStart(which, ev) {
      ev.dataTransfer.setData("Text", this.id);
      ev.dataTransfer.dropEffect = "move";
      this.dragging = which;
    },
    dragEnter(ev) {},
    dragLeave(ev) {},
    dragEnd(ev) {
      this.dragging = -1;
    },
    dragFinish(to, ev) {
      this.moveItem(this.dragging, to);
      ev.target.style.marginTop = "2px";
      ev.target.style.marginBottom = "2px";
    },
    moveItem(from, to) {
      if (to === -1) {
        this.removeItemAt(from);
      } else {
        this.todos.splice(to, 0, this.todos.splice(from, 1)[0]);
      }
    }
  },
  computed: {
    isDragging() {
      return this.dragging > -1;
    }
  }
  /*mounted() {
    this.$watch(vm => [vm.addItem], val => {
      
      this.order = this.newItem + ' ' + this.newItem;
      
    }, {immediate: true}) // run immediately
  } 
   /* watch: {
      addItem() {
        console.log('newItem')
    }
  }*/
});