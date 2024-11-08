// src/HomePage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import terrainfoot from '../../public/terrainfoot.jfif';
import equipment from '../../public/equipmentsport.jpg';
import reser from '../../public/reservationsport.jpg';
import paiement from '../../public/paiement.jfif';
import gym from '../../public/gym.jfif';
import disponibilitee from '../../public/disponibilité.avif';
import serv from '../../public/serviceclient.avif';

const HomePage = () => {
  return (
    <Container className="my-5">
      <header className="text-center mb-5">
        <h1 className="display-4">Sportify</h1>
        <p className="lead">Plateforme de Réservation de Terrains et Installations Sportives</p>
        <p>
          Sportify propose un service en ligne permettant aux utilisateurs de réserver facilement des terrains de sport (football, tennis, basket, etc.), des salles de gym ou des équipements spécifiques dans divers lieux.
          Les utilisateurs peuvent consulter les disponibilités en temps réel, effectuer leurs réservations en quelques clics et effectuer leurs paiements directement via l’application.
        </p>
      </header>

      <section>
        <Row className="text-center mb-4">
          <h2>Nos Services</h2>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={terrainfoot} alt="Terrain de football" />
              <Card.Body>
                <Card.Title>Terrains de Sport</Card.Title>
                <Card.Text>
                  Réservez des terrains de football, tennis, basket et bien plus encore, dans des emplacements variés.
                </Card.Text>
                <Button variant="primary" href="/installations">Voir plus</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={gym} alt="Salle de gym" />
              <Card.Body>
                <Card.Title>Salles de Gym</Card.Title>
                <Card.Text>
                  Accédez à des salles de gym modernes avec des équipements de qualité pour vos séances d'entraînement.
                </Card.Text>
                <Button variant="primary" href="/installations">Voir plus</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={equipment} alt="Équipements de sport" />
              <Card.Body>
                <Card.Title>Équipements Spécifiques</Card.Title>
                <Card.Text>
                  Louez des équipements spécifiques pour répondre à vos besoins, que ce soit pour le sport ou le fitness.
                </Card.Text>
                <Button variant="primary" href="/equipment">Voir plus</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="my-5">
        <Row className="text-center mb-4">
          <h2>Pourquoi Choisir Sportify ?</h2>
        </Row>
        <Row>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={reser} alt="Réservation facile" style={{ height: '150px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Réservation Facile</Card.Title>
                <Card.Text>
                  En quelques clics, réservez votre terrain ou salle de sport préférée depuis le confort de votre domicile.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={paiement} alt="Paiement sécurisé" style={{ height: '150px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Paiement Sécurisé</Card.Title>
                <Card.Text>
                  Effectuez des paiements en toute sécurité directement via l'application, sans tracas supplémentaires.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={disponibilitee} alt="Disponibilité en temps réel" style={{ height: '150px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Disponibilité en Temps Réel</Card.Title>
                <Card.Text>
                  Consultez les disponibilités en temps réel pour ne jamais rater la chance de réserver votre créneau.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={serv} alt="Service client 24/7" style={{ height: '150px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Service Client 24/7</Card.Title>
                <Card.Text>
                  Notre équipe est à votre disposition à tout moment pour répondre à vos questions et vous assister.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default HomePage;
