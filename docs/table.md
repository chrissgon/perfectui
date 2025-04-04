#### Components

# Table

Documentation and examples of tables using Perfect UI.

### Basic

Using the most basic table markup, here's how the tables look. All the examples are responsive - the tables allow them to be scrolled horizontally with ease.

To create a table, simply add the `.table` class.

To make your table responsive, simply add `.table-responsive` to its parent.

```html
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Bordered

Add border on all sides of the table and cells.

To create a bordered table, simply add the `.table-bordered` class.

```html
<table class="table table-bordered">
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Striped

Add zebra-striping to any table row.

To create a striped table, simply add the `.table-striped` class.

```html
<table class="table table-striped">
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Hoverable

To create a hoverable table, simply add the `.table-hoverable` class.

```html
<table class="table table-hoverable">
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

These hoverable rows can also be combined with the striped variant:

```html
<table class="table table-striped table-hoverable">
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Borderless

A table without borders.

To create a borderless table, simply add the `.table-borderless` class.

```html
<table class="table table-borderless">
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Headless

A table can render without a table header if no `<thead>` is supplied.

```html
<table class="table">
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Selection

Rows can be selectable by making first column as a selectable column.

Simply add a `checkbox` in the first column.

```html
<table class="table">
  <thead>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Search input

Search is used for making dropdown items searchable.

```html
<table class="table table-bordered">
  <thead>
    <tr>
      <td colspan="5">
        <label class="input-group input !w-96">
          <i class="bi-search"></i>
          <input type="text" class="input" placeholder="Seach for items" />
        </label>
      </td>
    </tr>
    <tr class="bg-secondary">
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Pagination

Example with pagination using [Lists](https://github.com/chrissgon/perfectui/blob/main/docs/list.md).

```html
<table class="table table-bordered">
  <thead>
    <tr>
      <td colspan="5">
        <label class="input-group input !w-96">
          <i class="bi-search"></i>
          <input type="text" class="input" placeholder="Seach for items" />
        </label>
      </td>
    </tr>
    <tr class="bg-secondary">
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="5">
        <ul class="list list-hoverable unmarker group-row">
          <a class="list-item">
            <i class="bi-chevron-left"></i>
          </a>
          <a class="list-item active">1</a>
          <a class="list-item">2</a>
          <a class="list-item">3</a>
          <a class="list-item">
            <i class="bi-chevron-right"></i>
          </a>
        </ul>
      </td>
    </tr>
  </tfoot>
</table>
```
