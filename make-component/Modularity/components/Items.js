import Component from '../core/Component.js';

export default class Items extends Component {
  setup() {
    this.state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.state;
    return `
      <ul>
        ${items
          .map(
            (item, key) => `
        <li>
        ${item}
        <button class="deleteBtn" data-index="${key}">삭제</button>
        </li>`,
          )
          .join('')}
      </ul>
      <button class="addBtn">추가</button>
    `;
  }

  setEvent() {
    // 이벤트 버블링을 사용하여 화면의 모든 요소에 일일이 이벤트 리스너를 추가하는 대신 컴포넌트의 this.$target에 이벤트 리스너를 달아놓고 하위에서 발생한 클릭 이벤트를 감지,,
    this.$target.addEventListener('click', ({ target }) => {
      const items = [...this.state.items];

      if (target.classList.contains('addBtn')) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains('deleteBtn')) {
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }
    });
  }
}
