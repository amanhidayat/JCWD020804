// AddRoomlForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditRoomForm = () => {
  const { id } = useParams()
  const token = localStorage.getItem('token');
  const formik = useFormik({
    initialValues: {
      NameRoom: '',
      Description: '',
      Price: '',
      picture: '',
    },
    validationSchema: Yup.object({
      NameRoom: Yup.string().required('The Name Room must be filled in'),
      Description: Yup.string().required('Description cannot be empty'),
      Price: Yup.string().required('Price cannot be empty'),
      picture: Yup.mixed().test(
        'fileSize',
        'Photo size is too large (max 1 MB)',
        (value) => {
          if (!value) return true; // Allow empty file (user might not want to change the photo)
          return value.size <= 1 * 1024 * 1024; // 1 MB
        },
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();

      try {
        data.append('name', values.NameRoom);
        data.append('description', values.Description);
        data.append('price', values.Price);
        data.append('picture', values.picture);

        const response = await axios.patch(
          `http://localhost:8000/api/room/edit-room/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="NameRoom"
            className="block text-sm font-medium text-gray-700"
          >
            Room Name:
          </label>
          <input
            type="text"
            id="NameRoom"
            name="NameRoom"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.NameRoom}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.NameRoom && formik.errors.NameRoom ? (
            <div className="text-red-500 text-sm">{formik.errors.NameRoom}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lokasi"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="Description"
            name="Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Description}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.Description && formik.errors.Description ? (
            <div className="text-red-500 text-sm">
              {formik.errors.Description}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="Price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="text"
            id="Price"
            name="Price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Price}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.Price && formik.errors.Price ? (
            <div className="text-red-500 text-sm">{formik.errors.Price}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="picture"
            className="block text-sm font-medium text-gray-700"
          >
            Your Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue('picture', event.currentTarget.files[0]);
              formik.setFieldTouched('picture', true);
              formik.setFieldError('picture', ''); // Reset error pada field picture setiap kali berubah
            }}
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.ktpImage && formik.errors.ktpImage
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.picture && formik.errors.picture && (
            <p className="text-red-500 text-sm">{formik.errors.picture}</p>
          )}
        </div>
        {formik.values.picture && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Preview Your Picture
            </label>
            <img
              src={URL.createObjectURL(formik.values.picture)}
              alt="Preview KTP"
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default EditRoomForm;
