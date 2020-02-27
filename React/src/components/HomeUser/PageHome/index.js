import React from 'react';
import 'src/components/HomeUser/homeUser.scss';

import { Container, Row, Col } from 'react-bootstrap';

import NavMobile from 'src/components/HomeUser/PageHome/NavMobile';
import Search from 'src/containers/HomeUser/Search';
import NavDesktop from 'src/containers/HomeUser/NavDesktop';
import Books from 'src/containers/HomeUser/Books';
import Map from 'src/components/HomeUser/PageHome/Map';
import NavCategory from 'src/containers/HomeUser/NavCategory';
import AllBooks from 'src/components/HomeUser/PageHome/AllBooks';

import ModalSearchBookIsbn from 'src/containers/Modals/ModalSearchBookIsbn';
import ModalResponseBookIsbn from 'src/containers/Modals/ResponseIsbn';
import ModalSuccessAddBookIsbn from 'src/containers/Modals/ModalSuccessAddBookIsbn';
import ModalRecapReserveBook from 'src/containers/Modals/ModalRecapReserveBook';

const PageHome = () => {
  return (
    <Container fluid>
      {/* Nav qui s'affiche uniquement sur mobile */}
      <Row>
        <NavMobile />
      </Row>
      {/* Cette Sidebar disparait quand on est sur mobile */}
      <Row>
        {/* --------- SideBar de gauche ------------------------------ */}
        <Col className="sideBarUser d-none d-md-block" lg={2} md={2}>
          <NavDesktop />
        </Col>
        {/* -------------------- Partie de droite -----------------------  */}
        <Col className="mainUser" lg={10} md={10}>
          {/* --------------------- Barre de recherche ---------------------- */}
          <Row>
            <Col lg={12}>
              <Search />
            </Col>
          </Row>
          {/* -----------------------Livres + carte -------------------------------- */}
          <Row>
            <Col lg={7}>
              <Books />
            </Col>
            <Col lg={5}>
              <Map />
            </Col>
          </Row>
          {/* ---------------------  navBarCategory ---------------------------- */}
          <Row>
            <Col lg={12}>
              <NavCategory />
            </Col>
          </Row>
          {/* ----------------------    Tous les livres ---------------------------*/}
          <Row>
            <Col lg={12} className="mt-2">
              <AllBooks />
            </Col>
          </Row>
        </Col>
        {/* ------------------------ Fin partie de droite ------------------- */}
      </Row>
      {/* ------------- modal de réponse suite à la recherche d'un book via Isbn   */}
      <ModalSearchBookIsbn />
      <ModalResponseBookIsbn />
      <ModalSuccessAddBookIsbn />
      <ModalRecapReserveBook />
    </Container>
  );
};

export default PageHome;
