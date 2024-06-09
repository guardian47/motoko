import { useEffect, useState } from 'react';
import { proyecto_backend } from 'declarations/proyecto_backend';
import { Table, Card, Container, Row, Button, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormGame from './FormGame';


function App() {
  const [games, setGames] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  useEffect(() =>{
    getGames();
  }, []);
  

  function getGames() {
    proyecto_backend.getAllGames().then(movies => {
      console.log(games)
      setGames(games_motoko);
  
    });
     
  }

  function deleteGames(id) {
    Swal.fire("Eliminando juego, espere por favor");
    Swal.showLoading();
    proyecto_backend.deleteGame(BigInt(id)).then(movies => {
      getGames();
  
    });
     
  }

  return (
    <Container className='m-3'>
    <Row>
        
        <Card>
            <Card.Body>
              <Row>
                <Col>
                <Card.Title>Lista de los juegos</Card.Title>
                </Col>
                <Col>
                <Button variant="success" onClick={() => navigate('/create-game')}>Agregar pelicula</Button>
                </Col>

                </Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Titulo</th>
                      <th>Descripcion</th>
                      <th>Rating</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      games.length > 0 ?
                      games.map((games)=>(
                        <tr>
                          <td>{Number(games.id)}</td>
                          <td>{games.title}</td>
                          <td>{games.description}</td>
                          <td>{Number(games.rating)}</td>
                          <td>
                            <Row>
                              <Col>
                              <Button variant='info' onClick={()=> getGames(Number(game.id))}>Editar</Button>
                              </Col>
                              <Col>
                              <Button variant='danger' onClick={()=>deleteGames(Number(game.id))}>Eliminar</Button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      ))
                      :<tr></tr>
                    }
                  </tbody>
                </Table>
            </Card.Body>
        </Card>
    </Row>
    <Modal show={setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Editar juego</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGame
          id={Number(game.id)}
          pTitle={game.title}
          pDesciption={game.description}
          pRating={game.rating}
          isEditable={true}
          />
        </Modal.Body>
      </Modal>
   </Container>
  );
}

export default App;
