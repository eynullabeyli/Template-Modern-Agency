'use client';
import React, { useEffect, useState } from 'react';
//= Components
import Split from '@/components/Common/Split';
//= Static Data
import contentFormData from '@/data/contact-form.json';
import styles from '../../styles/Contact.module.scss';
import countryData from '@/data/regions-to-countries';
import { Select } from 'antd';

function ContactForm({ theme, data }) {
  const { countries, zones } = require('moment-timezone/data/meta/latest.json');
  const timeZoneToCountry = {};
  const timeZoneCityToCountry = {};
  const [country, setCountry] = useState({ value: '', label: '' });
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  let myCountry;

  useEffect(() => {
    Object.keys(zones).forEach((z) => {
      timeZoneToCountry[z] = countries[zones[z].countries[0]].name;
      const cityArr = z.split('/');
      const city = cityArr[cityArr.length - 1];
      timeZoneCityToCountry[city] = countries[zones[z].countries[0]].name;
    });
    if (Intl) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      myCountry = Object.entries(countryData).find(
        ([key, value]) => key === userTimeZone
      );
      const currentLocationData = data?.find(
        (item) => item.country === myCountry[1]
      );
      setContactInfo({
        email: currentLocationData?.email,
        phoneNumber: currentLocationData?.phoneNumber,
        address: currentLocationData?.address,
      });
    }
  }, []);

  const handleSubmit = () => {};
  return (
    <section className="contact section-padding">
      <div className={styles.contact_button}>
        <Select
          showSearch
          // defaultValue="lucy"
          placeholder="Choose country"
          style={{ width: 120 }}
          value={
            country?.label !== ''
              ? country
              : {
                  value: 'Choose country',
                  label: 'Choose country',
                }
          }
          optionFilterProp="children"
          onChange={(value, option) => {
            setCountry(option);
            const selectedLocationData = data?.find(
              (item) => item.country === option?.label
            );
            if (selectedLocationData) {
              setContactInfo({
                email: selectedLocationData?.email,
                phoneNumber: selectedLocationData?.phoneNumber,
                address: selectedLocationData?.address,
              });
            }
          }}
          options={data?.map((item) => ({
            value: item?.country,
            label: item?.country,
          }))}
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form md-mb50">
              <h4 className="fw-700 color-font mb-50">Get In Touch.</h4>

              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="messages"></div>

                <div className="controls">
                  <div className="form-group">
                    <input
                      id="form_name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      required="required"
                      onChange={(e) =>
                        setInputValues((prevState) => ({
                          ...prevState,
                          name: e?.target?.value,
                        }))
                      }
                    />
                  </div>

                  <div className="form-group">
                    <input
                      id="form_email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required="required"
                      onChange={(e) =>
                        setInputValues((prevState) => ({
                          ...prevState,
                          email: e?.target?.value,
                        }))
                      }
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      id="form_message"
                      name="message"
                      placeholder="Message"
                      rows="4"
                      required="required"
                      onChange={(e) =>
                        setInputValues((prevState) => ({
                          ...prevState,
                          message: e?.target?.value,
                        }))
                      }
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`butn ${theme === 'light' ? 'dark' : 'bord'}`}
                  >
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="cont-info">
              <h4 className="fw-700 color-font mb-50">Contact Info.</h4>
              <Split>
                <h3 className="wow" data-splitting>
                  {contentFormData.title}
                </h3>
              </Split>
              <div className="item mb-40">
                <h5>
                  <a href="#0">{contactInfo?.email}</a>
                </h5>
                <h5>{contactInfo?.phoneNumber}</h5>
              </div>
              <Split>
                <h3 className="wow" data-splitting>
                  Visit Us.
                </h3>
              </Split>
              <div className="item">
                <h6>{contactInfo?.address}</h6>
              </div>
              <div className="social mt-50">
                <a href="#0" className="icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#0" className="icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#0" className="icon">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="#0" className="icon">
                  <i className="fab fa-behance"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
