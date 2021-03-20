import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import Header from '../Header';
import Footer from '../Footer';

import { Toolbar } from 'primereact/toolbar';
import {Button} from 'primereact/button';
import {SplitButton} from 'primereact/splitbutton';



const items = [
  {
    label: 'Update',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Delete',
    icon: 'pi pi-times'
  },
  {
    label: 'React Website',
    icon: 'pi pi-external-link',
    command: () => {
      window.location.href = 'https://reactjs.org/'
    }
  },
  {   label: 'Upload',
    icon: 'pi pi-upload',
    command: () => {
      window.location.hash = "/fileupload"
    }
  }
];

const leftContents = (
  <React.Fragment>
    <Button label="New" icon="pi pi-plus" className="p-mr-2" />
    <Button label="Upload" icon="pi pi-upload" className="p-button-success" />
    <i className="pi pi-bars p-toolbar-separator p-mr-2" />
    <SplitButton label="Save" icon="pi pi-check" model={items} className="p-button-warning"/>
  </React.Fragment>
);

const rightContents = (
  <React.Fragment>
    <Button icon="pi pi-search" className="p-mr-2" />
    <Button icon="pi pi-calendar" className="p-button-success p-mr-2" />
    <Button icon="pi pi-times" className="p-button-danger" />
  </React.Fragment>
);


function App() {
  return (
    <Router>

      <Header />

      <main>
        <p>Marzipan bears biscuit. Topping icing marshmallow. Dessert jelly dessert liquorice.</p>
        <p>Marzipan bears biscuit. Topping icing marshmallow. Dessert jelly dessert liquorice.</p>
        <p>Marzipan bears biscuit. Topping icing marshmallow. Dessert jelly dessert liquorice.</p>

        <Toolbar left={leftContents} right={rightContents} />




      </main>

      <Footer />

    </Router>
  );
}

export default App;
