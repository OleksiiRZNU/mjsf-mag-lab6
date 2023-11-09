<template>
  <div class="todo">
    <div class="card text-left">
      <div class="card-header">
        ToDo Component
      </div>
      <div class="card-body">
        <h5 class="card-title">My tasks</h5>
        <div class="card-text">

          <form>
            <div class="form-group">
              <label for="task-title">Task title</label>
              <input v-model="model.title" type="text" class="form-control" id="task-title"
                     aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="task-desc">Task description</label>
              <textarea v-model="model.description" class="form-control" id="task-desc"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="submit" :disabled="!isValid">Submit</button>
          </form>

          <ul class="pt-3">
            <li v-for="(item, index) in filteredTaskList" :key="index" class="d-flex justify-content-between mb-3">
              <div>
                <h4 v-if="item.status === 'completed'"><s>{{item.title}}</s></h4>
                <h4 v-else>{{item.title}}</h4>
                <p>{{item.description}}</p>
              </div>
              <button class="btn btn-primary" @click="updateTask(item)">Completed</button>
            </li>
          </ul>
        </div>
        <div class="card-footer">
          <button class="btn" :class="{'btn-primary':!filterStatus}" @click="filterStatus = ''">All</button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'completed'}"
                  @click="filterStatus = 'completed'">Completed
          </button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'incompleted'}"
                  @click="filterStatus = 'incompleted'">InCompleted
          </button>
          Active tasks count: {{ taskList.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Task} from '../models/task.ts';
  import {task} from "@vue/cli-plugin-eslint/ui/taskDescriptor";

  export default {
    name: "ToDo",
    props: {},
    data: () => {
      return {
        model: new Task(),
        taskList: [],
        filterStatus: "",
        loading: false,
      }
    },
    async mounted() {
      this.loading=true;
      this.taskList= await this.$services.todo.fetch();
      this.loading = false;
    },
    methods: {
      submit() {
        this.$services.todo.create(this.model)
            .then(() => this.$services.todo.fetch())
            .then(todos => this.taskList = todos)
            .then(() => this.model = new Task())
      },
      updateTask(task) {
        task.status = Task.TS_COMPLETED;
        this.$services.todo.save(task)
            .then(() => this.$services.todo.fetch())
            .then(todos => this.taskList = todos)
      }
    },
    watch: {
      message() {
        console.log("Message changed");
      }
    },
    computed: {
      task() {
        return task
      },
      messageLength() {
        return ("" + this.message).length;
      },
      isValid() {
        return this.model.title && this.model.description;
      },
      filteredTaskList() {
        return this.taskList.filter((item) => {
          if (!this.filterStatus) return true;
          return item.status === this.filterStatus;
        });
      }
    }

  }
</script>

<style scoped>
  .todo {
    background-color: aqua;
  }
</style>
