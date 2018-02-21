import aframe from 'aframe';
import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from './App';

describe('App', () => {

  let app;
  const searchQuery = 'Paris';
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8c226f8233af4f331fc8c0322631bfdb&text=${searchQuery}&extras=url_k&group_id=44671723%40N00&format=json&nojsoncallback=1`;

  const mockResponse = {
    photos: {
      photo: [{
        farm: 5,
        id: "25527609148",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "146123903@N04",
        secret: "bffd3b0efa",
        server: "4682",
        title: "Las Vegas (Paradise)",
        url_k: "https://farm5.staticflickr.com/4682/25527609148_bffd3b0efa_k.jpg"
      },
      {
        farm: 5,
        id: "37181315310",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "66252312@N00",
        secret: "8f57a632dd",
        server: "4509",
        title: "The Catacombs of Paris (360º Photo)",
        url_k: "https://farm5.staticflickr.com/4509/37181315310_8f57a632dd_k.jpg"
      },
      {
        farm: 5,
        id: "37181315310",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "66252312@N00",
        secret: "8f57a632dd",
        server: "4509",
        title: "The Catacombs of Paris (360º Photo)",
        url_k: undefined
      },
      {
        farm: 5,
        id: "36723254644",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "66252312@N00",
        secret: "e0016b2158",
        server: "4395",
        title: "The Louvre (360º Photo)",
        url_k: "https://farm5.staticflickr.com/4395/36723254644_e0016b2158_k.jpg"
      }
      ]
    }
  }

  const expectedResult = [
    'https://farm5.staticflickr.com/4682/25527609148_bffd3b0efa_k.jpg',
    'https://farm5.staticflickr.com/4509/37181315310_8f57a632dd_k.jpg',
    'https://farm5.staticflickr.com/4395/36723254644_e0016b2158_k.jpg'
  ];

  fetchMock.get(url, mockResponse);

  beforeEach(() => {
    app = shallow(<App />);
  });

  it('renders correctly', () => {

    expect(app).toMatchSnapshot();

  });

  it('has one <a-sky> element', () => {

    expect(app.find('a-sky')).toHaveLength(1);

  });

  describe('When the doSearch() method is called', () => {

    it('returns an array of photo urls', async () => {

      const searchResult = await app.instance().doSearch(searchQuery);
      expect(searchResult).toEqual(expect.arrayContaining(expectedResult));

    });

  });

  describe('When the loadImage() method is called', () => {

    it('sets the src attribute of the a-sky element to the first value in the photo url array', () => {

      app.instance().loadImage(expectedResult[0]);
      expect(app.find('a-sky').props().src).toEqual(expectedResult[0]);

    });

  });

});