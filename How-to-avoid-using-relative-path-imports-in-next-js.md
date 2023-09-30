# how-to-avoid-using-relative-path-imports-in-next-js



### Define your base directories — or module aliases — in a tsconfig.json file at the root of your Next.js project.
```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@components/*": ["components/*"],
      "@contentful/*": ["contentful/*"],
      "@layouts/*": ["layouts/*"],
      "@styles/*": ["styles/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"],
    }
  }
}
```




### Using module aliases
- import paths at the top of files are self-documenting and easier to write, meaning you can focus on writing code rather than traversing spaghetti directories. 
```
import PageMeta from "@components/PageMeta";
import RecentPostList from "@components/RecentPostList";
import SocialCards from "@components/SocialCards";

import ContentfulBlogPost from "@contentful/BlogPost";

import MainLayout from "@layouts/main";

import Styles from "@styles/BaseStyles.module.css";

import { Config } from "@utils/Config";
```












