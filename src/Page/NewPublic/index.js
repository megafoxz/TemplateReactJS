import React, { useEffect, useState } from 'react'
import { HotPost, Post, DetailPost } from '../../../src/components/Post'
import '../New/newStyle.scss'
import { useTranslation } from 'react-i18next'
import NewService from '../../services/newService'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LoadingOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import _ from 'lodash'

function New() {
    const [dataNews, setDataNews] = useState({
        total: 0,
        data: []
    })
    const [dataHotNew, setDataHotNew] = useState({
        total: 0,
        data: []
    })
    const [skip, setSkip] = useState(0)
    const [isViewDetail, setIsViewDetail] = useState(false)
    const [currentPost, setCurrentPost] = useState({})
    const  { t: translation } = useTranslation()

    const fetchDataNews = (skip = 0) => {
        NewService.userGetList(skip).then(result => {
            if(result.data && result.data.length > 0) {
                setDataNews({total: result.total, data: dataNews.data.concat(result.data)})
            }
        })
    }

    const fetchDataHotNew = () => {
        NewService.userGetHotNew(skip).then(result => {
            if(result.data && result.data.length > 0) {
                setDataHotNew({total: result.total, data: dataHotNew.data.concat(result.data)})
            } else {

            }
        })
    }

    useEffect(() => {
        fetchDataNews(0)
        fetchDataHotNew(0)
    },[])

    const onScrollToFetchData = () => {
        let newSkip = skip + 20
        setSkip(newSkip)
        fetchDataNews(newSkip)
    }
    
    const preventScroll = () => {
        if(dataNews.data.length !== 0) {
            if(dataNews.data.length !== dataNews.total) {
                return true
            }
            return false
        }

        return false
    }

    const onViewDetail = (id) => {
		NewService.userGetDetailById(id).then(result => {
			if(result && !_.isEmpty(result)) {
				setCurrentPost(result)
				setIsViewDetail(true)
			} else {
				notification.error({
					message: '',
					description: translation('new.viewDetailError')
				})
			}
		})
	}
    
    return (
        <>
        <main className="new_component mt-3">
            <div className="row">
                <div className="col-12 col-md-7">
                    <div className="new_component__content_left">
                        <InfiniteScroll
                            dataLength={dataNews.data.length}
                            next={onScrollToFetchData}
                            hasMore={preventScroll()}
                            loader={<LoadingOutlined />}
                            style={{overflow: 'hidden'}}
                            endMessage={dataNews.data.length > 0 ? <h4>{translation('new.readAll')}</h4> : ''}
                        >
                            {
                                (dataNews.data && dataNews.data.length > 0) ? dataNews.data.map((newItem, i) => {
                                    return (
                                        <Post key={i} post={newItem} setViewDetailPost={onViewDetail}/>
                                    )
                                }) : (
                                    <div className="d-flex justify-content-center h2">
                                        {translation('new.listEmpty')}
                                    </div>
                                )
                            }
                        </InfiniteScroll>
                    </div>
                </div>
                <div className="col-12 col-md-5">
                    <div className="new_component__content_right">
                        <div className="new_component__content_right__title">
                            {translation('new.oldPost')}
                        </div>
                        <InfiniteScroll
                            dataLength={dataHotNew.data.length}
                            next={onScrollToFetchData}
                            hasMore={preventScroll()}
                            loader={<LoadingOutlined />}
                            style={{overflow: 'hidden'}}
                            endMessage={dataHotNew.data.length > 0 ? <h4>{translation('new.readAll')}</h4> : ''}
                        >
                            {
                                (dataHotNew.data && dataHotNew.data.length > 0) ? dataHotNew.data.map((newItem, i) => {
                                    return (
                                        <HotPost key={i} post={newItem} setViewDetailPost={onViewDetail}/>
                                    )
                                }) : (
                                    <div className="d-flex justify-content-center h2">
                                        {translation('new.listEmpty')}
                                    </div>
                                )
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </main>
        <DetailPost 
            post={currentPost} 
            isOpen={isViewDetail} 
            closeModal={() => setIsViewDetail(false)}
        />
        </>
    )
}

export default New