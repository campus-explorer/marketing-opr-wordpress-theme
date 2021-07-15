import axios from 'axios';

/**
 * Makes a get request to the PostTypes endpoint.
 *
 * @returns {AxiosPromise<any>}
 */
//export const getPostTypes = () => axios.get('/wp-json/wp/v2/types');

/**
 * Makes a get request to the desired post type and builds the query string based on an object.
 *
 * @param {string|boolean} restBase - rest base for the query.
 * @param {object} args
 * @returns {AxiosPromise<any>}
 */
export const GetVideo = ({ key, id}) => {
	console.log(key, id);
	return axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${ key }&part=snippet&id=${ id }`);
};

/* const onChangeURL = async value => {

    const response = await fetch( `https://www.googleapis.com/youtube/v3/videos?key=${ apiKey }&part=snippet&id=${ post.acf.url }`, {
        cache: 'no-cache',
        headers: {
            'user-agent': 'WP Block',
            'content-type': 'application/json'
          },
        method: 'GET',
        redirect: 'follow', 
        referrer: 'no-referrer', 
    })
    .then(
        returned => {
            if (returned.ok) return returned;
            throw new Error('Network response was not ok.');
        }
    );

    let data = await response.json();
    data = data.data;
    setAttributes({itemData: data})

};

console.log('data',attributes.itemData);*/