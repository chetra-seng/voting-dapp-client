import React from "react";
import Layout from "../Layout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const About = () => {
  return (
    <Layout>
      <div className="container flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="inter-heading2">About</h2>
          <p>
            Decentralize Voting, web development project for the first semester
            of forth year in Royal University of Phnom Penh. The application
            utilized the latest web 3.0 technologies used to interact with smart
            contracts deploy on a blockchain network called CamDL. This app
            demostrate the uses of dApp used as a simple voting application.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="inter-heading2">Royal University of Phnom Penh</h2>
          <p>
            The Royal University of Phnom Penh is a national research university
            of Cambodia, located in the Phnom Penh capital. Established in 1960,
            it is the country's largest university. It hosts around 20,000
            students in undergraduate and postgraduate programmes. It offers
            degrees in fields such as sciences, humanities and social sciences,
            engineering as well as vocational courses in fields such as
            information technology, electronics, psychology and tourism. RUPP
            provides Cambodia's foremost degree-level language programmes
            through the Institute of Foreign Languages
          </p>
          <div className="container">
            <MapContainer center={[11.568481087780821, 104.89072218396015]} zoom={13} className="w-full h-[30vh]">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[11.568481087780821, 104.89072218396015]}>
                <Popup>
                  Faculty of Science, Building A, Room 407
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
