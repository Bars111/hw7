import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contacts = {
        id: Date.now(),
        names: name,
        phones: phone
    };

    if (editId === true) {
      setData(prev => prev.map(item => 
        item.id === editId ? contacts : item
      ));
      setEditId(null);
    } else if([name, phone].every(item => item.trim() !== '')){
      setData(prev => [...prev, contacts]);
    }
    setName('');
    setPhone('');
  };

  const handleEdit = (id) => {
    const item = data.find(item => item.id === id);
    setName(item.names);
    setPhone(item.phones);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <main className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Введите имя"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            value={phone}
            placeholder="Введите телефон"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit">
            {editId ? 'Сохранить' : 'Добавить'}
          </button>
        </form>

        <div className="results">
          {data.map((item) => (
            <div key={item.id} className="item">
              <div>
                <span>{item.names}</span>
                <span>{item.phones}</span>
              </div>
              <div>
                <button onClick={() => handleEdit(item.id)}>Редактировать</button>
                <button onClick={() => handleDelete(item.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
