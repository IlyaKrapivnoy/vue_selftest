export interface VueComponent {
  name: string;
  [key: string]: any;
}

export interface VueDirective {
  [key: string]: any;
}

export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  createdBy: string;
  completed: boolean;
}
