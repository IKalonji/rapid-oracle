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
    service.getSubScribers();
    service.getMyListedFunctions()

    const subscribers = service.subscribersResponse;
    const myListedFunctions = service.cretaedFunctionsresponse;
    const itemsArray = service.polybaseResponse;
    console.log("from manage: ",  myListedFunctions);
 
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
                            {myListedFunctions.map((func, index) => (
                            <AccordionTab key={index} header={`function name: ${func.title}`}>
                                <p className="m-0">
                                    Subscriber Address: {func.functionAddress}
                                </p>
                                <p className="m-0">
                                    Your wallet Address: {func.creatorAddress}
                                </p>
                            </AccordionTab>
                            ))}
                        </Accordion>        
                    </div>
                    </TabPanel>

                    <TabPanel header="Subscribed">
                        <Accordion >
                            {subscribers.map((func, index) => (
                                <AccordionTab key={index} header={`function name: ${func.FunctionName}`}>
                                    <p className="m-0">
                                        Function address: {func.FunctionAddress}
                                    </p>
                                </AccordionTab>
                                ))}
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