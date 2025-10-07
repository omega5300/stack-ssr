interface Link {
  app: string;
  path: string;
}

interface Tools extends Link {
  icon: string[];
}

export { 
  Link,
  Tools
}
