import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';

import { AppStateService } from '../Appstate-sevice/AppState.service';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    // let service = new AppStateService();
    const connectWallet = async() => {
        if (typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
            const accounts = window.ethereum.request({method: "eth_requestAccounts"})
            console.log(accounts);
        }
    }

    const startContent = (
        <React.Fragment>
            <Button color='blue' icon="pi pi-bars p-toolbar-separator mr-2" className="p-button mr-2" onClick={() => setVisible(true)} severity="secondary" text/>
            {/* <Button label="Rapid.Oracle" text disabled severity='info' /> */}
            <span className='flex pl-2 pt-1 block text-1xl font-bold mb-1 text-blue-600'> Rapid.Oracle </span>

            <Sidebar title='Side Bar' visible={visible} onHide={() => setVisible(false)} >

                <Divider />
                <Button icon='pi pi-home' size='large' text raised className='w-full' onClick={() => {navigate('/'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'> Home </span>
                </Button>

                <div style={{height:'5px'}}></div>
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-folder-open' onClick={() => {navigate('/documentation'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'> Docs </span>
                </Button>
                <div style={{height:'5px'}}></div>
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-desktop' onClick={() => {navigate('/tutorials'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'> Tutorials </span>
                </Button>
                <div style={{height:'5px'}}></div>
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-plus' onClick={() => {navigate('/list-function'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'>List function</span>
                </Button>
                <div style={{height:'5px'}}></div> 
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-eye' onClick={() => {navigate('/view-functions-cards'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'>View functions</span>
                </Button>
                <div style={{height:'5px'}}></div> 
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-wrench' onClick={() => {navigate('/manage-subscriptions'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'>Manage</span>
                </Button>
            </Sidebar>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <Button label='Connect wallet' icon="pi pi-id-card" className="p-button-warning mr-2" onClick={connectWallet}/>
        </React.Fragment>
    );

    return (
        <div className="card">

            <Toolbar start={startContent} end={endContent} />
        </div>
    );
}

export default Navbar;