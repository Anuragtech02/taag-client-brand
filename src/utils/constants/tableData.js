import { KMBFormatter, showAlert } from "..";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const props = {
  name: "file",
  action: `${process.env.REACT_APP_API_URL}/campaign/upload`,
  headers: {
    authorization: localStorage.getItem("token"),
  },

  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const handleChangeInvoice = async (e, record) => {
  const file = e.target.files[0];
  if (!file) {
    return showAlert("error", "Please Select a valid file");
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", window.location.pathname.split("/")[2]);
  formData.append("artistId", record._id);
  console.log(file);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URI}/campaigns/upload`,
    formData
  );
  console.log({ res });
};

const onClickDownloadInvoice = async (record) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URI}/campaigns/download-invoice/`,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
      params: {
        id: window.location.pathname.split("/")[2],
        artistId: record._id,
      },
      responseType: "blob",
    }
  );
  // Create blob link to download
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", record.invoice);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);
};

function getLink(record) {
  let link = record.deliverable?.includes("YT")
    ? record.youtube?.link || "NA"
    : record.instagram?.link || "NA";
  return link && link !== "NA" ? (
    <a
      style={{
        maxWidth: "100px",
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      href={link ?? ""}
      target="_blank"
      rel="noopener noreferrer"
    >
      {link}
    </a>
  ) : (
    <span>NA</span>
  );
}

function removeArtist(record) {}

export const tableData = {
  campaign: {
    main: {
      columns: [
        {
          title: "Name",
          fixed: "left",
          dataIndex: "name",
          key: "name",
          // width: "30%",
          searchable: true,
          // editable: true,
        },
        {
          title: "Link",
          dataIndex: "link",
          key: "link",
          // width: "20%",
          // searchable: true,
          render: (link, record) => getLink(record),
          editable: false,
        },
        {
          title: "Followers",
          dataIndex: "followers",
          key: "followers",
          render: (followers, record) => (
            <span>
              {KMBFormatter(
                record.deliverable?.includes("YT")
                  ? record.youtube?.subscribers
                  : record.instagram?.followers || "NA"
              )}
            </span>
          ),
          // width: "20%",
          sorter: (a, b) =>
            parseInt(a.instagram?.followers) - parseInt(b.instagram?.followers),
          // sortDirections: ["descend", "ascend"],
        },
        {
          title: "Avg. Views",
          dataIndex: "averageViews",
          key: "averageViews",
          render: (views, record) => (
            <span>
              {KMBFormatter(
                record.deliverable?.includes("YT")
                  ? record.youtube?.averageViews
                  : record.instagram?.averageViews
              )}
            </span>
          ),
          // sorter: (a, b) => a - b,
          // sortDirections: ["descend", "ascend"],
        },
        {
          title: "Deliverable",
          dataIndex: "deliverable",
          key: "deliverable",
          // width: "20%",
          searchable: true,
        },
        {
          title: "Brand Commercial",
          dataIndex: "brandCommercial",
          key: "brandCommercial",
          editable: true,
          render: (text) => <span>{KMBFormatter(text)}</span>,
          sorter: (a, b) =>
            parseInt(a.brandCommercial) - parseInt(b.brandCommercial),
          // width: "20%",
          // searchable: true,
        },
        {
          title: "CPV Brand",
          dataIndex: "cpvBrand",
          key: "cpvBrand",
          // width: "20%",
        },
      ],
      data: [
        {
          id: "1",
          name: "Barkha",
          link: "https://google.com",
          followers: "1M",
          avgViews: "400k",
          deliverable: "IG Reel",
          commercialCreator: "300k",
          brandCommercial: "400k",
          CPVBrand: "1",
          agencyFees: "100k",
        },
        {
          id: "2",
          name: "John Brown",
          link: "https://google.com",
          followers: "20k",
          avgViews: "100k",
          deliverable: "YouTube",
          commercialCreator: "150k",
          brandCommercial: "400k",
          CPVBrand: "1",
          agencyFees: "100k",
        },
      ],
    },
    info: {
      columns: [
        {
          title: "Name",
          fixed: "left",
          dataIndex: "name",
          key: "name",
          // width: "30%",
          searchable: true,
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
          // width: "30%",
          // searchable: true,
          // filters: [
          //   {
          //     text: "Male",
          //     value: "male",
          //   },
          //   {
          //     text: "Female",
          //     value: "female",
          //   },
          // ],
          // onFilter: (value, record) =>
          //   record.gender.toLowerCase().indexOf(value) === 0,
          sorter: (a, b) => a.gender.length - b.gender.length,
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          // width: "30%",
          searchable: true,
        },
        {
          title: "Language",
          dataIndex: "languages",
          key: "language",
          render: (languages) => (
            <span style={{ textTransform: "capitalize" }}>
              {languages.join(", ")}
            </span>
          ),
          // width: "30%",
          // searchable: true,
        },
        {
          title: "Category(Multiple#)",
          dataIndex: "categories",
          key: "categories",
          render: (categories) => <span>{categories?.join(", ")}</span>,
          // width: "30%",
          // searchable: true,
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
          // width: "30%",
          searchable: true,
        },
      ],
      data: [
        {
          id: "1",
          name: "Barkha",
          gender: "Female",
          location: "Mumbai",
          language: "English, Hindi",
          category: "Comedy,Beauty,Travel",
          type: "Macro",
        },
      ],
    },
    phone: {
      columns: [
        {
          title: "Name",
          fixed: "left",
          dataIndex: "name",
          key: "name",
          // width: "30%",
          searchable: true,
        },
        {
          title: "Agency Name",
          dataIndex: "agencyName",
          key: "agencyName",
          // width: "30%",
          searchable: true,
        },
        {
          title: "Manager",
          dataIndex: "manager",
          key: "manager",
          // width: "30%",
          searchable: true,
        },
        {
          title: "Contact",
          dataIndex: "contact",
          key: "contact",
          // width: "30%",
          searchable: true,
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          // width: "30%",
          searchable: true,
        },
      ],
      data: [
        {
          id: "1",
          name: "Barkha",
          agencyName: "agencyName",
          manager: "manager",
          contact: "1234567890",
          email: "email@gmail.com",
        },
      ],
    },
  },
  campaign_commercials: {
    columns: [
      {
        title: "Name",
        fixed: "left",
        dataIndex: "name",
        key: "name",
        // width: "30%",
        searchable: true,
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        // width: "30%",
        render: (date) => <span>{new Date().toLocaleDateString()}</span>,
        // searchable: true,
      },
      {
        title: "Invoice Upload",
        dataIndex: "invoice",
        key: "invoice",
        render: (invoice, record) =>
          invoice ? (
            <Button
              // href={`${process.env.REACT_APP_API_URI}/camapaign/${invoice}`}
              // download
              onClick={() => onClickDownloadInvoice(record)}
            >
              Download
            </Button>
          ) : (
            <input
              type="file"
              placeholder="Upload"
              onChange={(e) => handleChangeInvoice(e, record)}
            />
          ),

        // width: "30%",
        // searchable: true,
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        // width: "30%",
        searchable: true,
        editable: true,
      },
    ],
    data: [
      {
        id: "1",
        name: "Barkha",
        date: "01/01/2022",
        invoiceUpload: "https://google.com",
        uploadLink: "https://google.com",
        note: "Some Note",
      },
    ],
  },
  campaign_analytics: {
    columns: [
      {
        title: "Name",
        fixed: "left",
        dataIndex: "name",
        key: "name",
        // width: "30%",
        searchable: true,
      },
      {
        title: "Upload Link",
        dataIndex: "deliverableLink",
        key: "deliverableLink",
        // width: "30%",
        searchable: true,
        // editable: true,
      },
      {
        title: "Views",
        dataIndex: "views",
        key: "views",
        // width: "30%",
        searchable: true,
        render: (text) => <span>{KMBFormatter(text)}</span>,
      },
      {
        title: "Comments",
        dataIndex: "comments",
        key: "comments",
        // width: "30%",
        searchable: true,
        render: (text) => <span>{KMBFormatter(text)}</span>,
      },
      {
        title: "ROI",
        dataIndex: "roi",
        key: "ROI",
        // width: "30%",
        searchable: true,
      },
    ],
    data: [
      {
        id: "1",
        name: "Barkha",
        uploadLink: "https://google.com",
        views: "300k",
        comments: "30k",
        ROI: "0.3",
      },
    ],
  },
};
