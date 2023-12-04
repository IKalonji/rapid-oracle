import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';

import { AppStateService } from '../Appstate-sevice/AppState.service';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [buttonText, setButtonText] = useState('Connect Wallet')
    const [connected, setConnected] = useState(false)

    const navigate = useNavigate();
    const service = new AppStateService();

    const connect = () => {
        service.connectToMetaMask()
        setButtonText('connected')
    }

    const startContent = (
        <React.Fragment>
            <Button color='blue' icon="pi pi-bars p-toolbar-separator mr-2" className="p-button mr-2" onClick={() => setVisible(true)} severity="secondary" text/>
            {/* <Button label="Rapid.Oracle" text disabled severity='info' /> */}
            <div className="  p-3 m-3 flex align-items-center justify-content-center">
                <Link to="/" class="no-underline">
                <span className='flex pr-2 pt-1 block text-1xl font-bold mb-1 text-blue-600'>Rapid.Oracle</span>
                    {/* Link with no underline */}
                </Link>
            </div>
            

            <Sidebar title='Side Bar' visible={visible} onHide={() => setVisible(false)} >

                <Divider />
                <Button icon='pi pi-home' size='large' text raised className='w-full' onClick={() => {navigate('/'); setVisible(false)}}>
                    <span className='flex pl-6 block text-1xl font-bold mb-1"'> Home </span>
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
            <Button label={buttonText} icon="pi pi-id-card" className="p-button-warning mr-2" onClick={connect}/>
        </React.Fragment>
    );

    return (
        <div className="card">

            <Toolbar className='shadow-2 ' start={startContent} end={endContent} style={{backgroundColor:"white", height:"7rem"}}/>
        </div>
    );
}

export default Navbar;