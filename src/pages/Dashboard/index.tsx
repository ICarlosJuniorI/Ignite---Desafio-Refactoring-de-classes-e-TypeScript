import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
}

export default function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState({} as FoodProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getApiResponse() {
      const response = await api.get('/foods');

      setFoods(response.data);
    }

    getApiResponse();

  }, []);

  async function handleAddFood(food: FoodProps) {
    // const { foods } = useState();

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([
        ...foods,
        response.data
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodProps) {
    // const { foods, editingFood } = useState();

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        {
          ...editingFood,
          ...food
        },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood({id}: FoodProps) {
    // const { foods } = useState();

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    // const { modalOpen } = useState();

    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    // const { editModalOpen } = useState();

    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodProps) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

//   async componentDidMount() {
//   const response = await api.get('/foods');

//   this.setState({ foods: response.data });
// }

// handleAddFood = async food => {
//   const { foods } = this.state;

//   try {
//     const response = await api.post('/foods', {
//       ...food,
//       available: true,
//     });

//     this.setState({ foods: [...foods, response.data] });
//   } catch (err) {
//     console.log(err);
//   }
// }



// render() {
//   const { modalOpen, editModalOpen, editingFood, foods } = this.state;

//   return (
//     <>
//       <Header openModal={this.toggleModal} />
//       <ModalAddFood
//         isOpen={modalOpen}
//         setIsOpen={this.toggleModal}
//         handleAddFood={this.handleAddFood}
//       />
//       <ModalEditFood
//         isOpen={editModalOpen}
//         setIsOpen={this.toggleEditModal}
//         editingFood={editingFood}
//         handleUpdateFood={this.handleUpdateFood}
//       />

//       <FoodsContainer data-testid="foods-list">
//         {foods &&
//           foods.map(food => (
//             <Food
//               key={food.id}
//               food={food}
//               handleDelete={this.handleDeleteFood}
//               handleEditFood={this.handleEditFood}
//             />
//           ))}
//       </FoodsContainer>
//     </>
//   );
// }