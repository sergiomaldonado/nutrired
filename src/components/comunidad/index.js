import React, { Component } from 'react'
import { db } from '../../firebase/firebase'
import {
  Grid,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'
import Imagen from '../imagen.png'
import moment from 'moment'
import { uploadImage } from '../../firebase/storage'
import './comunidad.css'
// 
class ComunidadPacientes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      post: '',
      posts: null,
      images: null,
      loading: false,
      loadingMessage: '',
      comment: null
    }
  }

  componentDidMount() {
    const { auth, type } = this.props
    if (!auth) return
    this.getUser(auth, type)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth === this.props.auth) return
    this.getUser(this.props.auth, this.props.type)
  }

  getUser = (auth, type) => {
    const { uid } = auth
    db.ref('users/' + type)
      .child(uid)
      .once('value', snap => {
        const user = snap.val()
        db.ref('post').once('value', snap => {
          const posts = []
          snap.forEach(post => {
            posts.push({
              ...post.val(),
              id: post.key,
              show: false,
              commentsLoaded: []
            })
          })
          const orderedPosts = this.orderByDate(posts)
          this.setState({ user: { ...user, uid }, posts: orderedPosts })
        })
      })
  }

  /**
   * Ordena los posts por fecha
   * @param {Array} arr Array de posts
   */
  orderByDate = arr =>
    arr.sort((a, b) => moment(b.created_at) - moment(a.created_at))

  /**
   * Actualiza el estado[post] con el texto del textarea
   * @param {SyntheticEvent} e Toma el value del evento creado en onChange
   */
  handleTextarea = ({ target: { value: post } }) => this.setState({ post })

  /**
   * Recibe la(s) imágen(es) cargada(s) en el input
   * @param {SyntheticEvent} Event Evento del onChange del input
   */
  handleImage = ({ target: { files: images } }) => this.setState({ images })

  handleComment = (comment, id) => {
    this.setState({ comment })
  }

  toggleCommentBox = async position => {
    const { posts: p } = this.state
    const posts = [...p]
    const commentsPromise =
      typeof posts[position]['comments'] !== 'undefined'
        ? Object.keys(posts[position]['comments']).map(
            async id =>
              await db
                .ref('comment')
                .child(id)
                .once('value')
                .then(snap => ({ ...snap.val(), id: snap.key }))
          )
        : []
    const commentsResolve = await Promise.all(commentsPromise)
    const commentsLoaded = this.orderByDate(commentsResolve)
    posts[position] = {
      ...posts[position],
      show: !posts[position]['show'],
      commentsLoaded
    }
    this.setState({ posts })
  }

  submitComment = (id, position) => {
    const {
      comment,
      posts: p,
      user: { uid, nombre }
    } = this.state
    const commentObj = {
      comment,
      created_at: moment().format(),
      uid,
      user: nombre
    }
    db.ref('comment')
      .push(commentObj)
      .then(snap => {
        const key = snap.key
        db.ref('post')
          .child(id)
          .once('value', snap => {
            let { comments } = snap.val()
            comments =
              typeof comments === 'undefined'
                ? { [key]: true }
                : { ...comments, [key]: true }
            db.ref('post')
              .child(id)
              .update({ comments })
              .then(() => {
                const posts = [...p]
                posts[position]['commentsLoaded'].unshift(commentObj)
                this.setState({ posts })
              })
          })
      })
  }

  /**
   * Crea un nuevo post en la db y lo agrega al arreglo del estado
   * @param {String} type Tipo de post
   */
  submit = async type => {
    const {
      user: { apellido, nombre, posts: userPosts, uid },
      post,
      images: hasImages
    } = this.state
    const { type: roll } = this.props
    const created_at = moment().format()
    const images = hasImages ? await this.uploadImages() : false
    const status = 1
    const postObj = {
      apellido,
      created_at,
      nombre,
      post,
      status,
      type,
      uid,
      images
    }
    this.setState({ loading: true, loadingMessage: 'Registrando post' })
    db.ref('post')
      .push(postObj)
      .then(r => {
        const idPost = r.key
        const userPostsObj = { ...userPosts, [idPost]: true }
        db.ref('users/' + roll)
          .child(uid)
          .update({ posts: userPostsObj })
          .then(() => {
            this.setState(
              ({ posts, loading }) => ({
                posts: [postObj, ...posts],
                post: '',
                images: null,
                loading: !loading,
                loadingMessage: ''
              }),
              alert(`El post fue creado con el id ${r.key}`)
            )
          })
      })
      .catch(e => console.log(e))
  }

  /**
   * Sube las imágenes a firestore y retorna un objeto con las imágenes con la clave ascendente
   */
  uploadImages = async () => {
    const { images } = this.state
    if (!images) return
    this.setState({ loading: true, loadingMessage: 'Subiendo imágenes' })
    const imagesPromise = Object.keys(images).map(
      async key => await uploadImage('post', images[key])
    )
    const imagesResolve = await Promise.all(imagesPromise)
    return Object.assign({}, imagesResolve)
  }

  render() {
    const { comment, loading, loadingMessage, post, posts, user } = this.state
    return (
      <Grid className="post-container">
        <div className="main">
          <div className="main__post">
            <div className="main__item picture">
              <img src={Imagen} alt="" />
            </div>
            <div className="main__item content">
              <span className="content__text">
                <FormGroup>
                  <ControlLabel>Escribe algo</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="textarea"
                    name="post"
                    id="post"
                    cols="50"
                    rows="2"
                    onChange={this.handleTextarea}
                    placeholder="Escribe algún logro"
                  />
                </FormGroup>
              </span>
            </div>
            <div className="main__item buttons">
              {user && user.roll !== 'paciente' && (
                <Button
                  onClick={() => this.submit('__consejo__')}
                  disabled={loading ? true : !post && true}
                >
                  Publicar consejo
                </Button>
              )}
              <Button
                onClick={() => this.submit('__logro__')}
                disabled={loading ? true : !post && true}
              >
                Compartir logro
              </Button>
            </div>
            <div className="main__item label">
              <label htmlFor="images">+</label>
              <input
                placeholder="Images"
                type="file"
                name="images"
                accept="image/*"
                id="images"
                onChange={e => this.handleImage(e)}
                style={{ display: 'none' }}
                multiple
              />
            </div>
          </div>
        </div>

        {!posts ? (
          <span>Cargando posts</span>
        ) : posts.length > 0 ? (
          <div className="posts">
            {posts.map(
              (
                {
                  id,
                  apellido,
                  commentsLoaded,
                  images,
                  nombre,
                  post,
                  type,
                  show
                },
                i
              ) => (
                <div className="post">
                  <div
                    className={`posts__marker ${
                      type === '__logro__'
                        ? 'posts__marker--logro'
                        : 'posts__marker--consejo'
                    }`}
                  />
                  <div className="post__item picture">
                    <img src={Imagen} alt="" />
                  </div>
                  <div className="post__item name">
                    {nombre} {apellido}
                  </div>
                  <div className="post__item content">
                    <span className="content__text">{post}</span>
                  </div>
                  {images && (
                    <div className="post__item images">
                      {Object.keys(images).map(key => {
                        return (
                          <div
                            key={key}
                            className="images__image"
                            style={{
                              backgroundImage: `url("${images[key]}")`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat'
                            }}
                            onClick={() => window.open(images[key], '_blank')}
                          />
                        )
                      })}
                    </div>
                  )}
                  {show && (
                    <div className="posts_commentbox">
                      <div className="comments">
                        {commentsLoaded.map(c => (
                          <div>
                            <div>
                              <span className="bold">
                                {c.user}
                                {': '}
                              </span>
                              <span>
                                {'  '}
                                {c.comment}
                              </span>
                            </div>
                            <div className="comment_date">
                              {moment(c.created_at).fromNow()}
                            </div>
                          </div>
                        ))}
                      </div>
                      <hr />
                      <FormGroup>
                        <ControlLabel>Escribe tu comentario</ControlLabel>
                        <FormControl
                          componentClass="textarea"
                          placeholder="textarea"
                          name="post"
                          id="post"
                          cols="50"
                          rows="2"
                          onChange={({ target: { value } }) =>
                            this.handleComment(value)
                          }
                          placeholder="Escribe algún logro"
                        />
                      </FormGroup>
                      <Button
                        onClick={() => this.submitComment(id, i)}
                        disabled={comment ? false : true}
                      >
                        Comentar
                      </Button>
                    </div>
                  )}
                  <div className="posts__actions">
                    <span
                      className="post__actions__comment"
                      onClick={() => this.toggleCommentBox(i)}
                    >
                      {show ? 'Ocultar' : 'Comentar'}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <span>No hay ningún post por el momento</span>
        )}
      </Grid>
    )
  }
}

export default ComunidadPacientes
