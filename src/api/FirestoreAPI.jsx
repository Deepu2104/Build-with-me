import { toast } from "react-toastify";
import { firestore } from "../firebaseConfig";
import {addDoc, collection, onSnapshot, doc, updateDoc, 
  query, where, setDoc, deleteDoc} from "firebase/firestore"


let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
  addDoc(postsRef, object)
  .then(() => {
    toast.success("Post Added Successfully!");
  })
  .catch((err) => {
    console.log(err);
    toast.error("Could not Post. Some Error Occured!");
  })
}

export const getStatus = (setAllStatus) => {
  onSnapshot(postsRef, (response) => {
    setAllStatus(response.docs.map((docs) => {
      return {...docs.data(), id : docs.id};
    }));
  })
}

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(response.docs.map((docs) => {
      return {...docs.data(), id : docs.id};
    }));
  })
}

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  
  onSnapshot(userRef, (response) => {
    setCurrentUser(response.docs.map((docs) => {
      return {...docs.data(), userID : docs.id};
    }).filter((item) => {
      return item.email === localStorage.getItem("userEmail");
    })[0]
    ); 
  })
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);
  updateDoc(userToEdit, payload)
  .then(() => {
    toast.success("Profile Updated Successfully!");
  })
  .catch((err) => {
      console.log(err);
  });
}

export const likePost = (userId, postId, liked) => {
  try{
    let docTolike = doc(likeRef, `${userId}_${postId}`);
    if(liked){
      deleteDoc(docTolike);
    }else{
      setDoc(docTolike, {userId, postId});
    }
    
  }catch(err){
    console.log(err);
  }
}

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try{
    let likeQuery = query(likeRef, where("postId" , "==" , postId));
    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes.length;
      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);

      // console.log(likesCount);
    })
  }catch(err){
    console.log(err);
  }
}

export const postComment = (postId, comment, timeStamp, name) => {
  try{
    addDoc(commentsRef, {
      postId, comment, timeStamp, name
    })
  }
  catch(err){
    console.log(err);
  }
}

export const getComments = (postId, setComments) => {
  try{
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));
    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id : doc.id,
          ...doc.data(),
        }
      })
      setComments(comments);
    });
    
  }
  catch(err){
    console.log(err);
  }
}


export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id);
  try{
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Post Updated Successfully!");
  }
  catch(err){
    console.log(err);
  }
}

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try{
    deleteDoc(docToDelete);
    toast.success("Post has been deleted successfully");
  }
  catch(err){
    console.log(err);
  }
}

export const addConnection  = (userId, targetId) => {
  try{
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);
    setDoc(connectionToAdd, {userId, targetId});
    toast.success("Friend Added successfully");

  }catch(err){
    console.log(err);
  }
}

export const getConnections = (userId, targetId, setIsConnected) => {
  try{
    let connectionsQuery = query(connectionRef, where("targetId" , "==" , targetId));
    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some((connection) => connection.userId === userId);
      setIsConnected(isConnected);

    })
  }catch(err){
    console.log(err);
  }
}