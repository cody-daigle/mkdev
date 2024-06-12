import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import UserPosts from './UserPosts';
import Blogs from './Blogs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinId: string;
  githubId: string;
  sub: string;
  username: string;
  picture: string;
}
interface Post {
  id: number;
  userId: number;
  author: string;
  title: string;
  body: string;
}

interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [username, setUsername] = useState<string>('');
  const userRef = useRef(user);

  const [tab, setTab] = useState('1');

  const handleTab = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  const getUser = () => {
    if (user) {
      axios
        .get('/api/users/loggedIn')
        .then(({ data }) => {
          setUser(data);
          setPostsCount(data.postsCount);
          setFollowersCount(data.followersCount);
        })
        .catch((error) => {
          console.error('Failed to get user:', error);
        });
    }
  };

  const checkUsername = () => {
    return user.username === null || user.username === ''
      ? user.name
      : user.username;
  };
  useEffect(() => {
    const userId = user?.id;
    if (userId) {
      axios
        .get<Post[]>(`/api/posts/user/${userId}`)
        .then(({ data }) => {
          setPosts(data);
          // console.log('posts', data);
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    setUsername(checkUsername());
    getUser();
  }, [userRef]);

  return (
    <div>
      <Nav />
      {user && (
        <div>
          <h4>{`${username}`}</h4>
          <img
            src={user?.picture}
            alt={user?.name}
            style={{ width: 100, height: 100 }}
          />
          <p>{user?.linkedinId} LinkedIn Link</p>
          <p>{user?.githubId} Github Link</p>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTab} aria-label='lab API tabs example'>
                  <Tab label='Posts' value='1' />
                  <Tab label='Item Two' value='2' />
                  <Tab label='Item Three' value='3' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                {<UserPosts posts={posts} getPosts={function (): void {}} />}
              </TabPanel>
              <TabPanel value='2'>{<Blogs />}</TabPanel>
              <TabPanel value='3'>Item Three</TabPanel>
            </TabContext>
            <div
              style={{
                border: '1px solid black',
                padding: 1,
                borderRadius: 12,
              }}
            >
              {/* <UserPosts posts={posts} /> */}
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Profile;
