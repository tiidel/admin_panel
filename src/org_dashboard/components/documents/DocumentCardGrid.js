// DocumentCards.jsx
import React, { useState } from 'react';
import { FileText, File, CheckCircle } from 'lucide-react';
import './Documents.css';

const DocumentCard = ({ document }) => {
  const getDocumentIcon = (docPath) => {
    const extension = docPath.split('.').pop().toLowerCase();
    
    const iconStyles = {
      pdf: { color: '#FF4444', icon: FileText },
      docx: { color: '#2B579A', icon: FileText },
      doc: { color: '#2B579A', icon: FileText },
      default: { color: '#6B7280', icon: File }
    };

    return iconStyles[extension] || iconStyles.default;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const { icon: IconComponent, color } = getDocumentIcon(document.document);

  return (
    <div className="document-card">
      <div className="card-header">
        <div className="document-icon-wrapper">
          <IconComponent size={24} color={color} />
          <span className="document-type">{document.document_type}</span>
        </div>
        {document.verified && (
          <div className="verified-badge">
            <CheckCircle size={16} />
            <span>Verified</span>
          </div>
        )}
      </div>

      <div className="organization-info">
        <div className="organization-name">
          {document.organization.name}
        </div>
        <div className="upload-date">
          Uploaded: {formatDate(document.uploaded_at)}
        </div>
      </div>

      {document.notes && document.notes !== "no note" && (
        <div className="notes-section">
          <p className="notes-text">{document.notes}</p>
        </div>
      )}
    </div>
  );
};

const DocumentCardGrid = () => {
  const [documents, setdocuments] = useState(
    [
      {
          "id": 1,
          "document_type": "REGISTRATION",
          "document": "/media/organization_verification_docs/NDA2.pdf",
          "uploaded_at": "2024-12-24T06:45:43.162335Z",
          "verified": true,
          "notes": "no note",
          "organization": {
              "id": "1b39a3db-07f8-4843-8276-02d64ff6164a",
              "created": "2024-12-21T07:08:32.314449Z",
              "modified": "2024-12-21T16:00:05.441774Z",
              "status": 1,
              "activate_date": "2024-12-21T07:03:58Z",
              "deactivate_date": null,
              "is_deleted": false,
              "metadata": {},
              "created_by": "kimbidarl@gmail.com",
              "created_at": "2024-12-21T07:08:32.314500Z",
              "updated_by": null,
              "updated_at": null,
              "name": "Tiidel",
              "logo": "/media/media/logo/LinkenIn.png",
              "banner": "/media/media/cover_image/LINKENIN_BANNER.png",
              "description": "tiidel inc is  have an investment app called tiidel. now for users to invest in companies (mosstly local african startups) they need to see some information on these companies. companies upload videos and write articles on their activities. however some financial or company statistics or metrics are relevant for investment. I created a company report api to load financial metrics like revenue growth (net income) and an investment chart showing how much investment",
              "headquarters": "Bamenda, Cameroon",
              "ticker_symbol": "TIDL",
              "founded_date": "2024-12-21",
              "country": "Cameroon",
              "website": "https://tiidel.com",
              "linkedin_url": "http://linkedin.com/company/tiidel",
              "organization_type": "STARTUP",
              "fund_stage": "seed",
              "industry": "Technology",
              "stage": "Series N",
              "total_funding": "3000000.00",
              "valuation": "9000000.00",
              "registration_number": "234565432345",
              "verification_status": "VERIFIED",
              "verified_date": "2024-10-05T07:07:54Z",
              "share_price": null,
              "available_shares": null,
              "total_shares": null,
              "is_traded": false,
              "is_public": false,
              "trading_symbol": null,
              "listing_date": "2024-12-21",
              "market_cap": "8000.00",
              "stock_type": "COMMON",
              "founder": 1,
              "sector": 1,
              "verified_by": 1,
              "primary_exchange": 1,
              "preferred_broker": 1,
              "employees": [
                  1,
                  2,
                  3,
                  4
              ],
              "followers": [
                  1
              ],
              "secondary_exchanges": [
                  1
              ]
          },
          "verified_by": {
              "id": 3,
              "last_login": null,
              "created_at": "2024-12-21T07:20:42.993213Z",
              "updated_at": "2024-12-21T07:20:43.021868Z",
              "username": "kimbidarlington2",
              "first_name": "kimbi",
              "last_name": "darlington",
              "email": "kimbidarl@gmail.com",
              "investor_type": null,
              "accredited_investor": false,
              "is_staff": false,
              "is_active": true,
              "is_superuser": false,
              "cni": null,
              "dob": null,
              "address_one": null,
              "address_two": null,
              "phone": "+237676638050",
              "phone_one": null,
              "phone_two": null,
              "bio": "",
              "date_joined": "2024-12-21T07:20:42.831831Z",
              "photo": null,
              "email_verified": false,
              "profile": null,
              "is_married": false,
              "gender": null,
              "ipv4_address": null,
              "ipv6_address": null,
              "country": "",
              "country_code": null,
              "country_flag": null,
              "city": "",
              "postal_code": "",
              "default_currency": "",
              "default_language": "",
              "preferred_currency": null,
              "company_verified": false,
              "interests": null,
              "investment_capacity": null,
              "investment_stages": null,
              "industry": null,
              "professional_email": null,
              "company_position": null,
              "company": null,
              "groups": [],
              "user_permissions": [],
              "following": []
          },
          "verified_at": "2024-12-24T06:45:35Z",
          "uploader": 4
      }
  ]
  )
  return (
    <div className="document-grid">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
};

export default DocumentCardGrid;