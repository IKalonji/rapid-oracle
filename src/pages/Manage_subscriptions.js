import React, {useState} from 'react'

import { Editor } from 'primereact/editor';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Blockies from 'react-blockies'; 

import { AppStateService } from '../Appstate-sevice/AppState.service';

const ManageSubscriptions = () => {
    const service = new AppStateService();
    service.getSubScribers(service.walletAddress);

    const subscribers = service.subscribersResponse;
    const itemsArray = service.polybaseResponse;
    console.log("from manage: ",  subscribers);
 
  return (
    <div>
        <div className="bg-primary-800 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap " style={{height:"12rem", background:`url(https://media.cryptoglobe.com/2020/08/zeus-capital-chainlink-dont-get-fooled-768x384.jpg)`}}>
            {/* <img src={data.image} style={{width:'180px', height:'180px', borderRadius:"20%", position:"relative", top:"45px"}}/> */}

            <div style={{borderRadius:"50%", position:"relative", top:"75px"}}> 
                <Blockies seed={`data.title`} size={25} scale={8} spotColor='#7ED7C1' color='#dfe' />

            </div>
        </div>

        <div style={{height:"132px"}}></div>

        {/* </div> */}
        <div className='flex justify-content-center align-items-center'>
            <Card className='shadow-5' style={{width:'70%'}}>
                <span className="block text-2xl font-bold mb-1">view your function details and subscriptions </span>
                <h1>sub: </h1>
                <div className="card">
                <TabView>
                    <TabPanel header="Listed">
                        <div className="card">
                        <Accordion>
                            <div style={{ height: "200px" }}></div>
                            {subscribers.map((func, index) => (
                            <AccordionTab key={index} header={func.FunctionAddress}>
                                <p className="m-0">
                                    FUnction details
  
                                </p>
                            </AccordionTab>
                            ))}
                        </Accordion>        
                    </div>
                        
                    </TabPanel>

                    <TabPanel header="Subscribed">
                        <Accordion >
                                <AccordionTab header="Functions you subscribed to">
                                    <p className="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </AccordionTab>
                                <div style={{height:"200px"}}></div>


                            </Accordion>
                        {/* <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} headerTemplate={header} readOnly style={{ height: '220px' }}/> */}
                    </TabPanel>

                </TabView>
            </div>
                <div style={{height:"20px"}}></div>
                {/* <Button  severity='primary' onClick={() => setVisible(true)} style={{position:"relative", left:"80%"}}> subscribe </Button> */}
                </Card>
        </div>
        <div style={{height:"132px"}}></div>
        
    </div>
  )
}

export default ManageSubscriptions;