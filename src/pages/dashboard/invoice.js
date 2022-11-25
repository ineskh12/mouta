import React, { useRef } from "react";
import logo_colored from "../../assets/img/logo_colored.png";
import { useReactToPrint } from "react-to-print";
import { Card, Table } from "@themesberg/react-bootstrap";
import { useTranslation } from "react-i18next";
import { Paper, TableContainer } from "@mui/material";

export default function Dashboard(props, ref) {
  const { t } = useTranslation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <button onClick={handlePrint}>{t('print')}</button>

      <Card
        ref={componentRef}
        border="light"
        className="bg-white shadow-sm mb-4 all-center"
      >
        <Card.Body>
          <div className="card">
            <div className="card-header bg-black" />
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <img height={"100px"} alt="logo" src={logo_colored} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <ul className="list-unstyled float-start">
                      <li style={{ fontSize: 30, color: "blue" }}>Skiesbook inc.</li>
                      <li>123, Elm Street</li>
                      <li>123-456-789</li>
                      <li>mail@mail.com</li>
                    </ul>
                    <ul className="list-unstyled float-end">
                      <li style={{ fontSize: 30, color: "red" }}>Company</li>
                      <li>123, Elm Street</li>
                      <li>123-456-789</li>
                      <li>mail@mail.com</li>
                    </ul>
                  </div>
                </div>
                <div className="row text-center">
                  <h3
                    className="text-uppercase text-center mt-3"
                    style={{ fontSize: 40 }}
                  >
                    {t('invoice')}
                  </h3>
                  <p>123456789</p>
                </div>
                <Card border="light" className="shadow-sm mb-4">
                  <Card.Body className="p-0">
                    <TableContainer component={Paper}>
                      <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                      >
                        <thead className="thead-light">
                          <tr>
                            <th className="border-0">#</th>
                            <th className="border-0">{t('cemetery_name')}</th>
                            <th className="border-0">{t('Responsible')}</th>
                            <th className="border-0">{t('phone')}</th>
                            <th className="border-0">{t('address')}</th>
                            <th className="border-0">{t('actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>aaziz</td>
                            <td>s</td>

                            <td className="fw-bold">aaziz</td>
                            <td>aaziz</td>
                            <td>aaziz</td>
                            <td>ok</td>
                          </tr>
                        </tbody>
                      </Table>
                    </TableContainer>
                  </Card.Body>
                </Card>
                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled me-0">
                      <li>
                        <span className="me-3">{t('Total Amount')}:</span>
                        <i className="fas fa-dollar-sign" /> 6850,00
                      </li>
                      <li>
                        {" "}
                        <span className="me-5">{t('Discount')}:</span>
                        <i className="fas fa-dollar-sign" /> 500,00
                      </li>
                      <li>
                        <span
                          className=""
                          style={{ marginRight: 35 }}
                        >
                          {t('Shipment')}:{" "}
                        </span>
                        <i className="fas fa-dollar-sign" /> 500,00
                      </li>
                    </ul>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xl-8" style={{ marginLeft: 60 }}>
                    <p
                      className=""
                      style={{
                        fontSize: 30,
                        color: "red",
                        fontWeight: 400,
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      {t('Total')}:
                      <span>
                        <i className="fas fa-dollar-sign" /> 6350,00
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row mt-2 mb-5">
                  <p className="fw-bold">
                    {t('Date')}: <span className="text-muted">23 June 20221</span>
                  </p>
                  <p className="fw-bold mt-3">{t('Signature')}:</p>
                </div>
              </div>
            </div>
            <div className="card-footer bg-black" />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
